import { NextRequest, NextResponse } from "next/server";
import { pinecone } from "@/lib/pinecone";
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
    const chatbot_id = formData.get("chatbot_id") as string;

    //Delete Chatbot from supabase databse

    const { error } = await supabase
      .from("chatbots")
      .delete()
      .eq("public_id", chatbot_id);

    if (error) {
      return NextResponse.json(
        {
          error: "Failed to delete chatbot from Database",
        },
        { status: 400 }
      );
    }

    const index = pinecone.Index("docs");

    try {
      await index.namespace(chatbot_id).deleteAll();
    } catch (error: any) {
      return NextResponse.json(
        {
          error: "Failed to delete namespace from vector databse",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        msg: "Successfuly deleted chatbot from Database",
        chatbot_id: chatbot_id,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
