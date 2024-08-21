import MaxWidthWrapper from "./MaxWidthWrapper";
import PricingCardsContainer from "./PricingCardsContainer";

const PricingSection = (): JSX.Element => {
  return (
    <MaxWidthWrapper
      className="relative w-full min-h-screen box-border grid grid-flow-row grid-rows-11 z-[2]"
      id="pricing"
    >
      <div className="w-full flex items-center justify-center row-span-4 z-[3] flex-col">
        <h3 className="text-center text-6xl font-medium animate-text-gradient bg-gradient-to-r from-white via-[#27272a] to-white bg-[200%_auto] bg-clip-text text-transparent leading-relaxed align-middle">
          The right price for for your needs
        </h3>
      </div>
      <div className="w-full h-full row-span-6 flex gap-x-6">
        <PricingCardsContainer />
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#71717a_150%)]"></div>
    </MaxWidthWrapper>
  );
};

export default PricingSection;
