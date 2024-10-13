import { pinecone } from "@/lib/pinecone";
import { createClient } from "@/utils/supabase/server";
import openAIEmbeddings from "@/lib/langchain";
import { PineconeStore } from "@langchain/pinecone";
import { NextRequest, NextResponse } from "next/server";
import { streamText, convertToCoreMessages } from "ai";
import { openai } from "@ai-sdk/openai";
import {
  checkQuestionUsage,
  updateQuestionUsage,
} from "@/utils/stripe/helpers";

export const maxDuration = 30;

const PINECONE_INDEXES = ["docs1", "docs2", "docs3", "docs4", "docs5"];

export async function POST(req: NextRequest) {
  const supabase = createClient();

  try {
    const { messages, chatbot_id } = await req.json();

    if (!messages || !chatbot_id) {
      return NextResponse.json(
        { error: "No message or chatbot id provided" },
        { status: 400 }
      );
    }

    const { data: chatbotData, error } = await supabase.rpc(
      "get_limited_chatbots",
      {
        search_public_id: chatbot_id,
      }
    );

    if (error) {
      return NextResponse.json(
        { error: "Failed to retrieve chatbot data" },
        { status: 500 }
      );
    }

    if (!chatbotData) {
      return NextResponse.json({ error: "Chatbot not found" }, { status: 404 });
    }

    const firstFoundChatbot = chatbotData[0];

    const questions_remaining = await checkQuestionUsage(
      firstFoundChatbot.user_id
    );

    if (questions_remaining === -1) {
      return NextResponse.json(
        { error: "Failed to check question usage" },
        { status: 500 }
      );
    }

    if (questions_remaining <= 0) {
      return NextResponse.json(
        { error: "No questions remaining" },
        { status: 400 }
      );
    }

    const indexNumber = firstFoundChatbot.index_id;
    if (indexNumber < 1 || indexNumber > PINECONE_INDEXES.length) {
      return NextResponse.json(
        { error: "Invalid index number" },
        { status: 400 }
      );
    }

    const indexName = PINECONE_INDEXES[indexNumber - 1];
    const index = pinecone.Index(indexName);

    let vectoreStore;
    try {
      vectoreStore = await PineconeStore.fromExistingIndex(openAIEmbeddings, {
        pineconeIndex: index,
        namespace: chatbot_id,
      });
    } catch (error) {
      console.error("Pinecone error:", error);
      return NextResponse.json(
        { error: "Failed to connect to vector store" },
        { status: 500 }
      );
    }

    const coreMessages = convertToCoreMessages(messages);
    let results;
    try {
      results = await vectoreStore.similaritySearch(
        coreMessages[coreMessages.length - 1].content as string,
        4
      );
    } catch (error) {
      console.error("Similarity search error:", error);
      return NextResponse.json(
        { error: "Failed to perform similarity search" },
        { status: 500 }
      );
    }

    const formattedPrevMessages = coreMessages.map((msg) => ({
      role: msg.role === "user" ? ("user" as const) : ("assistant" as const),
      content: msg.content,
    }));

    let stream;
    try {
      stream = await streamText({
        model: openai("gpt-4o-mini"),
        messages: [
          {
            role: "system",
            content: `Answer in HTML format using only context provided. Follow these rules:
1. Use tags: <code>, <ul>, <ol>, <li>, <h1>, <h2>, <h3>, <p>, <br />
2. Include only body content, no other tags
3. Format:
   - <h1 class="text-md font-bold my-2">
   - <p class="text-base">
   - <a class="text-white underline">
   - All others: class=""
4. Code blocks:
   <div class="code-wrapper">
     <div class="code-language">{language}</div>
     <div class="code-content"><code>{code}</code></div>
   </div>
5. Describe image content, use lists for steps
6. Include context links with <a> tags
7. Be clear and concise
8. If context is unclear, state what's needed
9. If you think there is a list of items, use <ul> or <ol> and <li> tags. Example of list of items: - Item 1 - Item 2 - Item 3, then turn it into <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul> or use <ol> instead of <ul>. 

Example structure:
<h1 class="text-md font-bold my-2">Title</h1>
<p class="text-muted-foreground text-base">Intro...</p>
<ul class="my-2"><li class="my-2">Item</li></ul>
[Code block as shown above]
<p class="text-muted-foreground text-base my-2">Conclusion with <a href="..." class="text-white underline my-2">link</a>.</p>
                    `,
          },
          {
            role: "user",
            content: `Use the following pieces of context (or previous conversation if needed) to answer the user's question. If the question is not related to the context, say "I'm sorry, I can only answer questions related to this SaaS.", don't try to make up an answer.\n
      \n----------------\n
      PREVIOUS CONVERSATION:
      ${formattedPrevMessages.map((message: any) => {
        if (message.role === "user") return `User: ${message.content}\n`;
        return `Assistant: ${message.content}\n`;
      })}
      \n----------------\n
      CONTEXT:
      ${results.map((r) => r.pageContent).join("\n\n")}
      USER INPUT: ${coreMessages[messages.length - 1].content}`,
          },
        ],
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to generate response" },
        { status: 500 }
      );
    }

    const isUpdateSuccesful = updateQuestionUsage(
      firstFoundChatbot.user_id,
      questions_remaining
    );

    if (!isUpdateSuccesful) {
      return NextResponse.json(
        { error: "Failed to update question usage" },
        { status: 500 }
      );
    }

    return stream.toDataStreamResponse();
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
