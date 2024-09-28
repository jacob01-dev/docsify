"use client";
import { Button } from "./ui/button";
import { ArrowUpRight, Loader, Loader2 } from "lucide-react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutButton = ({ priceId }: { priceId: string }): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const { sessionId } = await res.json();

      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      toast({
        title: "Error has occured during redirecting to checkout",
        description: "Please refresh this page and try again.",
      });
    }
  };

  return (
    <Button
      className={cn("group", {
        "gap-x-2": loading,
      })}
      variant={"default"}
      onClick={handleCheckout}
      disabled={loading || !priceId}
    >
      {loading ? (
        <>
          Redirecting to checkout
          <Loader2 className="h-4 w-4 animate-spin" />
        </>
      ) : (
        <>
          Subscribe
          <ArrowUpRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </>
      )}
    </Button>
  );
};

export default CheckoutButton;
