import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";
import { plans } from "@/app/data/plans";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-06-20",
});

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          ...plans[0],
          isActive: false,
          currentPeriodEnd: null,
        },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("subscriptions")
      .select(
        "status, price_id, stripe_subscription_id, current_period_start, current_period_end"
      )
      .eq("user_id", user.id)
      .single();

    if (error || !data) {
      return NextResponse.json({
        ...plans[0],
        isActive: false,
        currentPeriodEnd: null,
      });
    }

    const period_end = new Date(data.current_period_end).getTime();
    const isSubscribed = Boolean(
      data.price_id &&
        data.current_period_end &&
        period_end + 86_400_000 > Date.now()
    );

    const plan = isSubscribed
      ? plans.find((plan) => plan.price_id === data.price_id)
      : null;

    let isCanceled = false;
    if (isSubscribed && data.stripe_subscription_id) {
      const stripePlan = await stripe.subscriptions.retrieve(
        data.stripe_subscription_id
      );
      isCanceled = stripePlan.cancel_at_period_end;
    }

    return NextResponse.json({
      ...plan,
      stripeCurrentPeriodEnd: data.current_period_end,
      isSubscribed,
      isCanceled,
    });
  } catch (error) {
    console.error("Error in getUserSubscription:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
