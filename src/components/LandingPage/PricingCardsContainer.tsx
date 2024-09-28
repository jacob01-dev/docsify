import PricingCard from "./PricingCard";
import { plans } from "@/app/data/plans";
const tiers = plans;
const PricingCardsContainer = (): JSX.Element => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col lg:flex-row row-span-6 gap-x-12 gap-y-12 box-border">
      {tiers.map((tier, index) => (
        <PricingCard
          key={index}
          name={tier.title}
          href={"/signup"}
          priceMonthly={tier.price}
          description={tier.description}
          features={tier.features}
        />
      ))}
    </div>
  );
};

export default PricingCardsContainer;
