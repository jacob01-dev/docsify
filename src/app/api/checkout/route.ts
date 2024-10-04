import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest) {
  const { priceId } = await request.json();
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      {
        error: "User not authenticated.",
      },
      { status: 401 }
    );
  }

  const userId = user.id;

  const validPriceIds = [
    // "price_1PuF38H7aP3qMhj2p5mlr987",
    // "price_1PnLzWH7aP3qMhj29aIhSH6r",
    // "price_1PnM0gH7aP3qMhj2V8eqvJJG",
    // "price_1PnM2NH7aP3qMhj2KLiy9r9B",
    "price_1Q5oDWH7aP3qMhj2Z2ZQ9xdY", // free
    "price_1Q5oEWH7aP3qMhj2rDsZF0gO", // basic
    "price_1Q5oFCH7aP3qMhj2uGpCV2K5", // professional
    "price_1Q5oFlH7aP3qMhj24UGoc7Ny", // business
  ];

  if (!validPriceIds.includes(priceId)) {
    return NextResponse.json(
      {
        error: "Invalid price ID.",
      },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      payment_method_collection:
        priceId === validPriceIds[0] ? "if_required" : "always",
      success_url: `${request.headers.get("origin")}/payment/success`,
      cancel_url: `${request.headers.get("origin")}/payment/cancel`,
      client_reference_id: userId,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
