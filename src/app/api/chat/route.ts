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
            content: `Use the following pieces of context (or previous conversation if needed) to answer the user's question in HTML format. Code blocks should be wrapped with <code> tag. Don't apply any classes unless they are specified. If the link is provided inside context e.g: #[Section: section name, link: /example], include it in the output using <a> tag with corresponding href.
                    Use only the specified tags.
                    Your output must:
                    - Use the tags: <code>, <ul>, <ol>, <li>, <h1>, <h2>, <h3>, <p>, <br />
                    - Only include the inner part of the <body> tag
                    - Don't include any other tags
                    - Format the code blocks properly, but don't add unnecessary whitespaces.
                    - Output code blocks like this:
                        <div class="code-wrapper">
                          <div class="code-language">
                            {language e.g Python, JavaScript or HTML}
                          </div>
                          <div class="code-content">
                            <code>
                              {your code here}
                            </code>
                          </div>
                        </div>
                    - For every paragraph apply text-align: left.
                    - For every code block apply text-align: left.
                    - DO NOT APPLY CLASSES TO ANY TAG UNLESS USER SPECIFIED
                    - For every <h1> tag apply class="text-md font-bold"
                    - For every <p> tag apply class="text-muted-foreground text-base"
                    - For every <a> tag apply class="text-white underline"
                    - For every tag apply class="my-2"
                    `,
          },
          {
            role: "user",
            content: `Use the following pieces of context (or previous conversation if needed) to answer the user's question. If the question is not related to the context, say "I'm sorry, I can only answer questions related to this code documentation.", don't try to make up an answer.\n
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
