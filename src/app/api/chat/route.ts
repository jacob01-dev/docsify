import { pinecone } from "@/lib/pinecone";
import { createClient } from "@/utils/supabase/server";
import openAIEmbeddings from "@/lib/langchain";
import { PineconeStore } from "@langchain/pinecone";
import { NextRequest, NextResponse } from "next/server";
import { streamText, convertToCoreMessages } from "ai";
import { openai } from "@ai-sdk/openai";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { messages, chatbot_id } = await req.json();

  if (!messages || !chatbot_id) {
    return NextResponse.json(
      { error: "No message or chatbot id provided" },
      { status: 400 }
    );
  }

  const index = pinecone.Index("docs");

  const vectoreStore = await PineconeStore.fromExistingIndex(openAIEmbeddings, {
    pineconeIndex: index,
    namespace: chatbot_id,
  });

  const coreMessages = convertToCoreMessages(messages);

  const results = await vectoreStore.similaritySearch(
    coreMessages[coreMessages.length - 1].content as string,
    4
  );

  const formattedPrevMessages = coreMessages.map((msg) => ({
    role: msg.role ? ("user" as const) : ("assistant" as const),
    content: msg.content,
  }));

  const stream = await streamText({
    model: openai("gpt-4o-mini"),
    messages: [
      {
        role: "system",
        content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in html format. Code blocks should be wrapper with <code> tag. Don't apply any classes unless they are specified. If the link is provided inside context e.g: #[Section: section name, link: /example], include it in the the output using <a> tag with corresponding href.
                Use only the specified tags.
                Your output must:
                - Use the tags: <code>, <ul>, <ol>, <li>, <h1>, <h2>, <h3>, <p>, <br />
                - Only include the inner part of the <body> tag
                - Don't include any other tags
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
        content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question . \nIf the question is not related to the context, say "Im sorry, I can only answer questions related to this code documentation.", don't try to make up an answer. 

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

  return stream.toDataStreamResponse();
}
