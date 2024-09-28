import MaxWidthWrapper from "../MaxWidthWrapper";
import PricingCardsContainer from "./PricingCardsContainer";

const PricingSection = (): JSX.Element => {
  return (
    <MaxWidthWrapper
      className="relative w-full min-h-screen box-border grid grid-flow-row py-12 gap-y-14 lg:gap-y-0 lg:grid-rows-11 z-[2]"
      id="pricing"
    >
      <div className="w-full flex items-center justify-center lg:row-span-4 z-[3] flex-col">
        <h3 className="px-4 max-w-7xl bg-gradient-to-b from-white to-[#71717a] bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
          The right price for for your needs
        </h3>
      </div>
      <div className="w-full h-full lg:row-span-6 flex gap-x-6">
        <PricingCardsContainer />
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#71717a_150%)]"></div>
    </MaxWidthWrapper>
  );
};

export default PricingSection;
