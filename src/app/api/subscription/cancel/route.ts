import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function GET(request: NextRequest) {
  try {
    if (request.method !== "GET") {
      return NextResponse.json(
        { error: "Invalid request method" },
        {
          status: 405,
        }
      );
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({
        error: "User not authenticated.",
        status: 401,
      });
    }

    const { data: subscriptionData, error: subscriptionError } = await supabase
      .from("subscriptions")
      .select("stripe_subscription_id, status")
      .eq("user_id", user.id)
      .single();

    if (subscriptionError || !subscriptionData) {
      return NextResponse.json({
        error: "Something went wrong",
        status: 500,
      });
    }

    if (subscriptionData.status === "canceled") {
      return NextResponse.json({
        message: "Subscription already canceled",
        status: 200,
      });
    }

    console.log(subscriptionData.status);

    const { stripe_subscription_id } = subscriptionData;

    const canceledSubscription = await stripe.subscriptions.update(
      stripe_subscription_id,
      { cancel_at_period_end: true }
    );

    const { error: updateError } = await supabase
      .from("subscriptions")
      .update({ status: "canceled" })
      .eq("user_id", user.id);

    if (updateError) {
      console.error("Error updating subscription in database:", updateError);
      return NextResponse.json({ error: "Something went wrong", status: 500 });
    }

    return NextResponse.json({
      message: "Subscription canceled successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong", status: 500 });
  }
}
