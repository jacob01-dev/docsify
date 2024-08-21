import PricingCard from "./PricingCard";

const tiers = [
  {
    name: "Free",
    id: "tier-free",
    href: "/login",
    priceMonthly: "$0",
    description: "Ideal for personal projects.",
    features: [
      "1 Chatbot",
      "Up to 100 questions per month",
      "GPT 4o mini access",
    ],
  },
  {
    name: "Basic",
    id: "tier-basic",
    href: "/login",
    priceMonthly: "$20",
    description: "Perfect for starting",
    features: ["1 Chatbot", "Up to 700 questions per month", "GPT 4o access"],
  },
  {
    name: "Professional",
    id: "tier-professional",
    href: "/login",
    priceMonthly: "$50",
    description: "Ideal for growing teams.",
    features: ["3 Chatbots", "Up to 3000 questions per month", "GPT 4o access"],
  },
  {
    name: "Business",
    id: "tier-business",
    href: "/login",
    priceMonthly: "$100",
    description: "For large-scale projects.",
    features: ["5 Chatbots", "Up to 5000 questions per month", "GPT 4o access"],
  },
];
const PricingCardsContainer = (): JSX.Element => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col lg:flex-row row-span-6 gap-x-12 gap-y-12 box-border">
      {tiers.map((tier) => (
        <PricingCard
          key={tier.id}
          name={tier.name}
          href={tier.href}
          priceMonthly={tier.priceMonthly}
          description={tier.description}
          features={tier.features}
        />
      ))}
    </div>
  );
};

export default PricingCardsContainer;
