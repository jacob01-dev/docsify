import { Check } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { MagicCard } from "../magicui/magic-card";

const PricingCard = ({
  name,
  href,
  priceMonthly,
  description,
  features,
}: {
  name: string;
  href: string;
  priceMonthly: string;
  description: string;
  features: string[];
}): JSX.Element => {
  return (
    <MagicCard
      className="min-w-[350px] min-h-[550px] max-w-[350px] px-6 lg:px-8 flex flex-col gap-y-4 p-8 border-border border rounded-xl bg-background/40 bg-clip-padding backdrop-filter backdrop-blur-sm"
      gradientSize={200}
      gradientOpacity={0.5}
      gradientColor="#262626"
    >
      <div className="w-full p-4 flex flex-col gap-y-4">
        <h3 className="text-xl text-muted-foreground">{name}</h3>
        <h2 className="text-3xl text-muted-foreground">
          <span className="text-foreground font-bold">{priceMonthly} </span>
          /month
        </h2>
        <p className="text-lg text-neutral-600">{description}</p>
        <Link href={href} className="w-full flex flex-col">
          <Button variant={"default"} size={"lg"}>
            Get started
          </Button>
        </Link>
      </div>
      <div className="w-full border-border border-t flex flex-col py-4 px-4 gap-y-2">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-x-3 text-foreground"
          >
            <Check />
            <span className="text-muted-foreground">{feature}</span>
          </div>
        ))}
      </div>
    </MagicCard>
  );
};

export default PricingCard;
