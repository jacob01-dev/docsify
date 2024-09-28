"use client";
import { Link2Icon } from "@radix-ui/react-icons";
import { BookOpenText, Search, Settings2 } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { AnimatedListDemo } from "../LandingPageDemos/AnimatedListDemo";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { AnimatedBeamBiDirectionalDemo } from "../LandingPageDemos/AnimatedBeamBiDirectional";
import { ChartDemo } from "../LandingPageDemos/ChartDemo";
import CustomizationDemo from "../LandingPageDemos/CustomizationDemo";
import { motion, animate, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
const features = [
  {
    Icon: Link2Icon,
    name: "Easy Integration",
    description: "Create and deploy your personalized chatbot in minutes.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <AnimatedBeamBiDirectionalDemo className="select-none absolute right-2 lg:right-[8%] top-8 h-[300px] lg:w-[1200px] flex items-center justify-center border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: Search,
    name: "Instant Access",
    description:
      "Find answers instantly, without scrolling through lengthy documentation.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="select-none absolute right-2 top-4 h-[300px] lg:w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105 mx-auto" />
    ),
  },
  {
    Icon: BookOpenText,
    name: "Streamline learning process",
    description: "Simplify your user's learning process in just a few moments.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: <ChartDemo />,
  },
  {
    Icon: Settings2,
    name: "Customization",
    description: "Adjust the chatbot's design to match your brand.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: <CustomizationDemo />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5, // Increased from 0.3 to 0.5
      delayChildren: 0.3, // Increased from 0.2 to 0.4
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8, // Increased from 0.8 to 1.2
      ease: [0.25, 0.1, 0.25, 1], // Adjusted easing for slower, smoother motion
    },
  },
};

const GetStartedSection = () => {
  const controls = useAnimation();
  const divRef = useRef(null);
  const IsInView = useInView(divRef);

  useEffect(() => {
    if (IsInView) {
      controls.start("visible");
    }
    return () => controls.stop();
  }, [IsInView]);

  return (
    <MaxWidthWrapper className="min-h-screen max-w-screen relative flex flex-col items-center justify-center bg-background p-0 md:p-16 py-12 px-4">
      <motion.div
        className="w-full min-h-full"
        ref={divRef}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <BentoGrid className="">
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              className={cn("h-full grid", feature.className)}
              variants={itemVariants}
            >
              <BentoCard key={feature.name} {...feature} />
            </motion.div>
          ))}
        </BentoGrid>
      </motion.div>
    </MaxWidthWrapper>
  );
};

export default GetStartedSection;
