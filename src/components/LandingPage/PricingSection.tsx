import MaxWidthWrapper from "../MaxWidthWrapper";
import PricingCardsContainer from "./PricingCardsContainer";

const PricingSection = (): JSX.Element => {
  return (
    <MaxWidthWrapper
      className="relative w-full min-h-screen box-border grid grid-flow-row py-12 gap-y-14 lg:gap-y-0 md:grid-rows-1 2xl:grid-rows-11  z-[2] scroll-mt-20 lg:-scroll-mt-20 overflow-hidden"
      id="pricing"
    >
      {/* Header Section */}
      <div className="w-full flex items-center justify-center 2xl:row-span-4 z-[3] flex-col mb-12 2xl:mb-0">
        <h3 className="px-4 max-w-7xl bg-gradient-to-b from-white to-[#71717a] bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
          The right price for your needs
        </h3>
      </div>

      {/* Pricing Cards Container */}
      <div className="w-full h-full lg:row-span-6 flex flex-col xl:flex-row justify-center items-center gap-y-12 xl:gap-x-6 px-4">
        <PricingCardsContainer />
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#71717a_150%)]"></div>
    </MaxWidthWrapper>
  );
};

export default PricingSection;
