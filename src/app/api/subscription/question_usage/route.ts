// File: app/api/questionUsage/route.ts

import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("question_usage")
      .select("questions_remaining")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching question usage:", error.message);
      return NextResponse.json(
        { error: "Error fetching question usage" },
        { status: 500 }
      );
    }

    return NextResponse.json(data.questions_remaining);
  } catch (error) {
    console.error("Error in GET questionUsage:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // First, get the current usage
    const { data, error } = await supabase
      .from("question_usage")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching question usage:", error.message);
      return NextResponse.json(
        { error: "Error fetching question usage" },
        { status: 500 }
      );
    }

    if (!data || data.questions_remaining <= 0) {
      return NextResponse.json(
        { error: "No questions remaining" },
        { status: 403 }
      );
    }

    // Update the usage
    const { error: updateError } = await supabase
      .from("question_usage")
      .update({ questions_remaining: data.questions_remaining - 1 })
      .eq("user_id", user.id);

    if (updateError) {
      console.error("Error updating question usage:", updateError.message);
      return NextResponse.json(
        { error: "Error updating question usage" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      questionsRemaining: data.questions_remaining - 1,
    });
  } catch (error) {
    console.error("Error in POST questionUsage:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
