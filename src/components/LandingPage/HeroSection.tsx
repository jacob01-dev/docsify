"use client";
import Link from "next/link";
import { StarsBackground } from "../aceternity/ShootingStarsBackground";
import { ShootingStars } from "../aceternity/ShootingStars";
import { AnimatedGradientButton } from "../LandingPageDemos/GradientButton";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import SparklesText from "../ui/sparkles-text";

const HeroSection = (): JSX.Element => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const colors = ["#000", "#27272a", "#2C2C2C"];
  const color = useMotionValue(colors[0]);
  const bgImage = useMotionTemplate`radial-gradient(100% 100% at 50% 0%, black 60%, ${color})`;

  useEffect(() => {
    animate(color, colors, {
      ease: "easeInOut",
      duration: 8,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  return (
    <main className="min-h-screen grid grid-flow-row grid-rows-6 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ backgroundImage: bgImage }}
        className={cn(
          "relative w-full h-full flex flex-col items-center justify-center row-span-6 overflow-visible"
        )}
      >
        <motion.h2
          variants={itemVariants}
          className="z-10 px-4 max-w-7xl bg-gradient-to-br from-white to-[#71717a] bg-clip-text text-center text-4xl font-medium leading-tight text-transparent sm:leading-tight md:text-7xl md:leading-tight"
        >
          Tailored Technical Support <br></br>for your{" "}
          <span className="text-foreground">
            <SparklesText
              text="SaaS"
              className="inline text-4xl font-medium leading-tight text-foreground sm:leading-tight md:text-7xl md:leading-tight"
              colors={{ first: "#71717a", second: "#fff" }}
            />
          </span>
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="z-10 text-foreground/60 max-w-prose lg:max-w-3xl text-center text-md lg:text-xl px-4 my-6"
        >
          Easily convert your knowledge base into a chatbot and boost your
          customer support efficiency.
        </motion.p>
        <motion.div variants={itemVariants} className="z-10 w-full lg:w-1/2">
          <Link
            href="/login"
            className="z-10 w-full gap-x-4 flex flex-row items-center justify-center"
          >
            <AnimatedGradientButton />
          </Link>
        </motion.div>

        {/* Background Effects */}
        <div className="absolute z-0 inset-0 pointer-events-none">
          <ShootingStars starColor="#fff" trailColor="#71717a" maxSpeed={1} />
          <StarsBackground starDensity={0.0005} />
        </div>
      </motion.div>
    </main>
  );
};

export default HeroSection;
