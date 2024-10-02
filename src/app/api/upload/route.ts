import { NextRequest, NextResponse } from "next/server";
import { pinecone } from "@/lib/pinecone";
import openAIEmbeddings from "@/lib/langchain";
import { v4 as uuidv4 } from "uuid";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeStore } from "@langchain/pinecone";
import { createClient } from "@/utils/supabase/server";

const PINECONE_INDEXES = ["docs1", "docs2", "docs3", "docs4", "docs5"];
const MAX_NAMESPACES = 100;

async function findAvailableIndex(
  chatbot_id: string
): Promise<{ indexName: string; indexNumber: number }> {
  for (let i = 0; i < PINECONE_INDEXES.length; i++) {
    const indexName = PINECONE_INDEXES[i];
    const index = pinecone.Index(indexName);
    const stats = await index.describeIndexStats();
    const namespaceCount = Object.keys(stats.namespaces || {}).length;

    if (namespaceCount < MAX_NAMESPACES) {
      return { indexName, indexNumber: i + 1 };
    }
  }
  throw new Error("No available Pinecone indexes with free namespace slots.");
}

export async function POST(req: NextRequest) {
  const supabase = createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "A single PDF file is required." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are supported." },
        { status: 400 }
      );
    }

    const loader = new PDFLoader(file);
    const rawDocs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);

    const chatbot_id = uuidv4();

    const { indexName, indexNumber } = await findAvailableIndex(chatbot_id);
    const index = pinecone.Index(indexName);

    try {
      await PineconeStore.fromDocuments(docs, openAIEmbeddings, {
        pineconeIndex: index,
        namespace: chatbot_id,
      });
    } catch (error) {
      console.error("Pinecone error:", error);
      return NextResponse.json(
        { error: "Failed to insert vectors into Database" },
        { status: 400 }
      );
    }

    // Insert record into Supabase with the index_id as a number
    const { data, error } = await supabase
      .from("chatbots")
      .insert({
        user: user.id,
        public_id: chatbot_id,
        index_id: indexNumber,
      })
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create chatbot" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data: data }, { status: 200 });
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { sucess: false, error: error.message },
      { status: 500 }
    );
  }
}
