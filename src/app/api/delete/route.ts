import { NextRequest, NextResponse } from "next/server";
import { pinecone } from "@/lib/pinecone";
import { createClient } from "@/utils/supabase/server";

const PINECONE_INDEXES = ["docs1", "docs2", "docs3", "docs4", "docs5"];

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
    const chatbot_id = formData.get("chatbot_id") as string;

    if (!chatbot_id) {
      return NextResponse.json(
        { error: "Chatbot ID is required." },
        { status: 400 }
      );
    }

    // Get the chatbot details from Supabase
    const { data: chatbotData, error: fetchError } = await supabase
      .from("chatbots")
      .select("index_id")
      .eq("public_id", chatbot_id)
      .single();

    if (fetchError || !chatbotData) {
      return NextResponse.json(
        { error: "Failed to fetch chatbot details." },
        { status: 404 }
      );
    }

    // Delete Chatbot from Supabase database
    const { error: deleteError } = await supabase
      .from("chatbots")
      .delete()
      .eq("public_id", chatbot_id);

    if (deleteError) {
      return NextResponse.json(
        { error: "Failed to delete chatbot from Database" },
        { status: 400 }
      );
    }

    // Delete vectors from Pinecone
    const indexName = PINECONE_INDEXES[chatbotData.index_id - 1];
    const index = pinecone.Index(indexName);

    try {
      await index.namespace(chatbot_id).deleteAll();
    } catch (error: any) {
      console.error("Pinecone deletion error:", error);

      // Check if the error is a 404 (Not Found) error
      if (error.message && error.message.includes("HTTP status 404")) {
        console.log(
          `Namespace ${chatbot_id} not found in Pinecone. It may have already been deleted.`
        );
        // We'll continue with the deletion process as the data is not in Pinecone anyway
      } else {
        // For other errors, we'll return an error response
        return NextResponse.json(
          { error: "Failed to delete namespace from vector database" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        chatbot_id: chatbot_id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "An unexpected error occurred", success: false },
      { status: 500 }
    );
  }
}
