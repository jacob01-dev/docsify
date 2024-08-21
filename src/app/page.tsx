import GetStartedSection from "@/components/GetStartedSection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HeroSectionDecorator from "@/components/HeroSectionDecorator";
import IntegrateSection from "@/components/IntegrateSection";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PricingSection from "@/components/PricingSection";
import WidgetOverviewSection from "@/components/WidgetOverviewSection";

export default function Home() {
  return (
    <MaxWidthWrapper className="bg-black dark">
      <Header />
      <HeroSection />
      <WidgetOverviewSection />
      <GetStartedSection />
      <IntegrateSection />
      <PricingSection />
    </MaxWidthWrapper>
  );
}
