import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";
import { plans } from "@/app/data/plans";
import {
  cancelSubscriptionInDatabase,
  updateSubscriptionInDatabase,
} from "@/utils/stripe/helpers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    // Verify the Stripe webhook signature
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  const supabase = createClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        console.log("checkout.session.completed");
        const session = event.data.object as Stripe.Checkout.Session;
        const subscriptionId = session.subscription as string;
        console.log(session);
        await updateSubscriptionInDatabase(
          supabase,
          session.client_reference_id as string,
          subscriptionId
        );
        break;
      }

      case "customer.subscription.deleted": {
        const deletedSubscription = event.data.object as Stripe.Subscription;
        await cancelSubscriptionInDatabase(supabase, deletedSubscription);
        break;
      }

      default:
        break;
    }
  } catch (error: any) {
    console.error(`Webhook handling error: ${error.message}`);
    return NextResponse.json(
      { error: "An error occurred while processing the webhook." },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
