"use client";
import { Dot } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MaxWidthWrapper from "./MaxWidthWrapper";
import CheckoutButton from "./CheckoutButton";
import { plans } from "@/app/data/plans";
import { useState } from "react";

interface TierCardProps {
  title: string;
  price: string;
  features: string[];
}

const TierCards = (): JSX.Element => {
  const [selectedTierPriceId, setSelectedTierPriceId] = useState<string>("");
  const tiers = plans.filter((plan) => plan.title !== "Free");

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value }: { value: string } = e.target;
    setSelectedTierPriceId(value);
  };

  return (
    <MaxWidthWrapper className="flex flex-col">
      <Card className="flex flex-col bg-primary-foreground">
        {" "}
        {/* flex flex-col justify-between py-4 px-4 bg-muted rounded-sm */}
        <CardHeader className="flex justify-between flex-row items-center">
          <h1 className="text-lg font-medium">Choose your plan</h1>
        </CardHeader>
        <CardContent className="border-b border-t border-border">
          <div className="flex flex-col flex-grow lg:flex-row gap-x-4 gap-y-4 py-4 rounded-sm">
            {tiers.map((tier, index: number) => (
              <div className="max-w-xl  transition-all duration-300 hover:scale-[1.02] group">
                {/* Radio Card */}
                <input
                  type="radio"
                  id={`card-${index}`}
                  name="radio-card"
                  value={tier.price_id}
                  className="hidden peer"
                  onChange={handleSelect}
                />
                <label
                  htmlFor={`card-${index}`}
                  className="block cursor-pointer peer-checked:border-foreground rounded-lg border border-card transition-all duration-300 group-hover:border-accent group-hover:border-1"
                >
                  <Card className="rounded-lg shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-md">{tier.title}</CardTitle>
                      <CardDescription className="text-xl font-bold text-foreground">
                        {tier.price}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-flow-col lg:justify-center items-center">
                      {tier.features.map((feature, index) =>
                        index <= tier.features.length - 2 ? (
                          <>
                            <p className="text-xs text-muted-foreground">
                              {feature}
                            </p>
                            <Dot className="h-5 w-5 text-muted-foreground" />
                          </>
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            {feature}
                          </p>
                        )
                      )}
                    </CardContent>
                  </Card>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end items-center p-6">
          <CheckoutButton priceId={selectedTierPriceId} />
        </CardFooter>
      </Card>
    </MaxWidthWrapper>
  );
};

export default TierCards;
