import PricingCard from "./PricingCard";
import { plans } from "@/app/data/plans";
const tiers = plans;
const PricingCardsContainer = (): JSX.Element => {
  return (
    <div className="w-full h-full flex flex-col xl:flex-row justify-center items-center gap-y-12 xl:gap-x-6 pr-6 pl-6 2xl:gap-x-12">
      {" "}
      {/* added padding */}
      {tiers.map((tier, index) => (
        <PricingCard
          key={index}
          name={tier.title}
          href="/signup"
          priceMonthly={tier.price}
          description={tier.description}
          features={tier.features}
        />
      ))}
    </div>
  );
};

export default PricingCardsContainer;
