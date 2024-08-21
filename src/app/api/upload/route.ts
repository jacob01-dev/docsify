import { NextRequest, NextResponse } from "next/server";
import { pinecone } from "@/lib/pinecone";
import openAIEmbeddings from "@/lib/langchain";
import { v4 as uuidv4 } from "uuid";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeStore } from "@langchain/pinecone";
import { createClient } from "@/utils/supabase/server";

// Disable body parsing by Next.js, so we can handle file uploads

export async function POST(req: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    if (!user) {
      return NextResponse.json(
        {
          error: "User not authenticated.",
        },
        { status: 401 }
      );
    }

    // Get the file from the request
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "A single PDF file is required." },
        { status: 400 }
      );
    }

    // Validate file type (PDF)
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        {
          error: "Only PDF files are supported.",
        },
        { status: 400 }
      );
    }

    const loader = new PDFLoader(file);
    const rawDocs = await loader.load();

    const pattern = /(?=#\[[^\]]+\])/g;
    const combinedText = rawDocs.map((doc) => doc.pageContent).join("\n");
    const chunks = combinedText.split(pattern);
    const totalPages = rawDocs[0].metadata.pdf.totalPages;
    const docs = chunks.map((chunk, index) => ({
      pageContent: chunk.trim(),
      metadata: { ...rawDocs[0].metadata, page: index + 1 }, // You can customize metadata as needed
    }));

    // Create Chatbot and insert record inside supabase databse

    const chatbot_id = uuidv4();

    const { data, error } = await supabase
      .from("chatbots")
      .insert({
        user: user.id,
        public_id: chatbot_id,
      })
      .select();

    console.log(error);
    if (error) {
      return NextResponse.json(
        {
          error: "Failed to create chatbot",
        },
        { status: 400 }
      );
    }
    const index = pinecone.Index("docs");

    try {
      await PineconeStore.fromDocuments(docs, openAIEmbeddings, {
        pineconeIndex: index,
        namespace: chatbot_id,
      });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json(
        {
          error: "Failed to insert vectors into Database",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: "ok", status: 200 }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
