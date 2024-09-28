"use client";
import MaxWidthWrapper from "../MaxWidthWrapper";
import GridPattern from "../LandingPageDemos/AnimatedGridPattern";
import { cn } from "@/lib/utils";
import { motion, animate, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import CopyToClipboardButton from "../CopyToClipboardButton";
import { base_widget_url } from "@/app/data/const";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5, // Increased from 0.3 to 0.5
      delayChildren: 0.4, // Increased from 0.2 to 0.4
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2, // Increased from 0.8 to 1.2
      ease: [0.25, 0.1, 0.25, 1], // Adjusted easing for slower, smoother motion
    },
  },
};

const IntegrateSection = (): JSX.Element => {
  const controls = useAnimation();
  const divRef = useRef(null);
  const IsInView = useInView(divRef);

  useEffect(() => {
    if (IsInView) {
      controls.start("visible");
    }
  }, [IsInView]);

  return (
    <MaxWidthWrapper className="relative flex flex-col lg:flex-row h-screen w-full max-w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-4 md:shadow-xl">
      <div className="w-1/2 h-[50%]">
        <GridPattern
          numSquares={40}
          maxOpacity={0.7}
          duration={2}
          repeatDelay={3}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] ",
            "inset-x-0 inset-y-[-50%] h-[100%] w-full skew-y-[15deg] md:h-[110%] lg:w-[50%] lg:h-[200%] lg:-skew-y-12"
          )}
        />
      </div>
      <motion.div
        className="relative z-10 w-full max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        ref={divRef}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12"
          variants={itemVariants}
        >
          Integrate with your website
        </motion.h1>
        <motion.div
          className="w-full transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] rounded-lg overflow-hidden shadow-2xl"
          variants={itemVariants}
        >
          <div className="py-2 px-4 border-b border-[#333] transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-400">HTML</h3>
            <CopyToClipboardButton
              textToCopy={`<script src="${base_widget_url}" id="your-chatbot-id"></script>`}
            />
          </div>
          <div className="p-4 md:p-6">
            <pre className="text-sm md:text-base text-gray-300 overflow-x-auto pb-6 lg:py-0 lg:whitespace-normal">
              <code className="flex justify-center items-start flex-col pb-3">
                <span className="text-gray-500">
                  {"<!-- Add the following script tag to your HTML file. -->"}
                </span>
                <br />
                <p className="text-left">
                  <span className="text-blue-400">{"<script "}</span>
                  <span className="text-green-400">src</span>
                  <span className="text-blue-400">=</span>
                  <span className="text-orange-400">"{base_widget_url}"</span>
                  <span className="text-green-400"> id</span>
                  <span className="text-blue-400">=</span>
                  <span className="text-orange-400">"your-chatbot-id"</span>
                  <span className="text-blue-400">{"></script>"}</span>
                </p>
              </code>
            </pre>
          </div>
        </motion.div>
      </motion.div>
    </MaxWidthWrapper>
  );
};

export default IntegrateSection;
