import { SupabaseClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { createClient } from "../supabase/client";
import { plans } from "@/app/data/plans";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-06-20",
});

export async function updateSubscriptionInDatabase(
  supabase: SupabaseClient,
  user_id: string,
  subscriptionId: string
) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const { error: SubscriptionError } = await supabase
    .from("subscriptions")
    .update({
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      price_id: subscription.items.data[0].plan.id,
      product_id: subscription.items.data[0].plan.product,
      current_period_start: new Date(
        subscription.current_period_start * 1000
      ).toISOString(),
      current_period_end: new Date(
        subscription.current_period_end * 1000
      ).toISOString(),
    })
    .eq("user_id", user_id);

  if (SubscriptionError) {
    console.error(
      `Error updating subscription (ID: ${subscription.id}):`,
      SubscriptionError.message
    );
  }
  // **ADD QUESTION USAGE UPDATE
  const price_id = subscription.items.data[0].price.id;
  const plan = plans.find((p) => p.price_id === price_id);
  const questions_remaining = plan ? plan.questions_per_month : 0;

  const { error: usageError } = await supabase
    .from("question_usage")
    .update({
      questions_remaining: questions_remaining,
      reset_date: new Date(
        subscription.current_period_end * 1000
      ).toISOString(),
    })
    .eq("user_id", user_id);

  if (usageError) {
    console.error(
      `Error updating question usage for subscription (ID: ${subscription.id}):`,
      usageError.message
    );
  }
}

export async function cancelSubscriptionInDatabase(
  supabase: SupabaseClient,
  subscription: Stripe.Subscription
) {
  const { error } = await supabase
    .from("subscriptions")
    .update({ status: "canceled" })
    .eq("stripe_subscription_id", subscription.id);

  if (error) {
    console.error(
      `Error cancelling subscription (ID: ${subscription.id}):`,
      error.message
    );
  } else {
    console.log(`Subscription (ID: ${subscription.id}) canceled successfully.`);
  }
}

export async function checkQuestionUsage(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("question_usage")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    console.error(
      "Error fetching question usage:",
      error?.message || "No data found"
    );
    return -1;
  }

  return data.questions_remaining;
}

export async function updateQuestionUsage(
  userId: string,
  questions_remaining: number
) {
  const supabase = createClient();

  console.log(userId);
  const { error: updateError } = await supabase
    .from("question_usage")
    .update({ questions_remaining: questions_remaining - 1 })
    .eq("user_id", userId);

  if (updateError) {
    return false;
  }
  return true;
}
