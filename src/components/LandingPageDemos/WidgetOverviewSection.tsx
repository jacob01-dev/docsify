"use client";

import MaxWidthWrapper from "../MaxWidthWrapper";
import Accordion from "./AnimatedAccordion";

const WidgetOverviewSection = (): JSX.Element => {
  return (
    <MaxWidthWrapper className="w-full min-h-screen flex justify-center items-center py-20 lg:py-0">
      <Accordion />
    </MaxWidthWrapper>
  );
};

export default WidgetOverviewSection;
