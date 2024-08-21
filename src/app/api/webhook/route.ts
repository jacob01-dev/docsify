import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const rawBody = await req.text(); // Get the raw body as text
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    // Use Buffer to handle the raw body
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      sig,
      endpointSecret
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  const supabase = createClient();

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      const subscriptionId = session.subscription as string;

      // Fetch the subscription details from Stripe
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      const {
        id: stripe_subscription_id,
        status,
        items,
        current_period_start,
        current_period_end,
      } = subscription;

      const product_id = items.data[0].price.product as string;
      const price_id = items.data[0].price.id as string;

      const { error } = await supabase.from("subscriptions").insert({
        user_id: session.client_reference_id,
        stripe_subscription_id,
        status,
        price_id,
        product_id,
        current_period_start: new Date(
          current_period_start * 1000
        ).toISOString(),
        current_period_end: new Date(current_period_end * 1000).toISOString(),
      });

      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json(
          { error: "Failed to save subscription data" },
          { status: 500 }
        );
      }

      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
