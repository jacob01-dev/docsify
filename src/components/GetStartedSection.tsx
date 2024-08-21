import { Search, Brain, Unplug } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const perks = [
  {
    name: "Instant Access",
    Icon: Search,
    description:
      "Your users can find answers instantly, without wading through dense documentation.",
  },
  {
    name: "Enhanced User Experience",
    Icon: Brain,
    description:
      "Simplify the learning curve for new developers and reduce support requests.",
  },
  {
    name: "Seamless Integration",
    Icon: Unplug,
    description:
      "Effortlessly integrate Docsify with your existing documentation.",
  },
];
const GetStartedSection = (): JSX.Element => {
  return (
    <MaxWidthWrapper className="relative min-h-[50vh] flex items-center justify-center flex-col py-12 gap-y-12">
      <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0 px-4 items-center">
        {perks.map((perk) => (
          <div
            key={perk.name}
            className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
          >
            <div className="md:flex-shrink-0 flex justify-center">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-foreground text-background">
                {<perk.Icon className="w-1/3 h-1/3" />}
              </div>
            </div>

            <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
              <h3 className="text-base font-medium text-foreground">
                {perk.name}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {perk.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default GetStartedSection;
