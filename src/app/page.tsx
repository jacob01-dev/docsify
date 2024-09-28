import Header from "@/components/LandingPage/Header";
import Footer from "@/components/LandingPage/Footer";
import GetStartedSection from "@/components/LandingPage/GetStartedSection";
import HeroSection from "@/components/LandingPage/HeroSection";
import IntegrateSection from "@/components/LandingPage/IntegrateSection";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PricingSection from "@/components/LandingPage/PricingSection";
import WidgetOverviewSection from "@/components/LandingPageDemos/WidgetOverviewSection";
import FAQSection from "@/components/LandingPage/FAQSection";
import Script from "next/script";
import { base_widget_url } from "./data/const";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="bg-black dark">
        <Header />
        <HeroSection />
        <WidgetOverviewSection />
        <GetStartedSection />
        <FAQSection />
        <IntegrateSection />
        <PricingSection />
        <Footer />
      </MaxWidthWrapper>
      <Script
        src={base_widget_url}
        id="a81fb55d-d662-4c17-82a1-a029c9887712"
        data-color="#09090b"
      ></Script>
    </>
  );
}
