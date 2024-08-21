import Link from "next/link";
import HeroSectionDecorator from "./HeroSectionDecorator";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = (): JSX.Element => {
  return (
    <main className="min-h-screen relative grid grid-flow-row grid-rows-6 overflow-hidden">
      <div className="w-full h-full flex flex-col gap-y-8 items-center justify-center z-[1] row-span-6 overflow-visible">
        <h2 className="text-4xl md:text-6xl font-medium text-foreground/90 max-w-6xl text-center px-4">
          Transform Your{" "}
          <span className="text-secondary">Code Documentation</span> into
          ChatBot
        </h2>
        <p className="text-foreground/60 max-w-prose lg:max-w-3xl text-center text-md lg:text-xl px-4">
          Create and deploy your own Personalized Chatbot in Minutes
        </p>
        <div className="w-full lg:w-1/2 ">
          <Link
            href={"/login"}
            className="w-full flex flex-row items-center justify-center gap-x-4 group"
          >
            <Button variant={"default"} className="w-1/2 lg:w-1/3 gap-x-1">
              Get Started{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all duration-250" />
            </Button>
          </Link>
        </div>
      </div>
      <HeroSectionDecorator />
    </main>
  );
};

export default HeroSection;
