import { cn } from "@/lib/utils";
import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import AccordionItem from "./AnimatedAccordionItem";
import AnimatedFileInput from "./AnimatedFileInput";
import CustomizeCardPreview from "./CustomizeCardPreview";
import Loader from "./LoaderWrapper";
import DeployButton from "./DeployButton";
import { motion, animate, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

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

const previewBoxVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const items = [
  {
    title: "Upload",
    content: `Prepare your knowledge base.`,
    maxHeight: 160,
  },
  {
    title: "Customize",
    content: "Upload your icon, change colors to suit your brand.",
    maxHeight: 140,
  },
  {
    title: "Deploy",
    content: "Deploying your tailored chatbot to the web is as easy as 1-2-3.",
    maxHeight: 140,
  },
];

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const controls = useAnimation();
  const divRef = useRef(null);
  const IsInView = useInView(divRef);

  useEffect(() => {
    if (IsInView) {
      controls.start("visible");
    }
  }, [IsInView]);

  const handleItemClick = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const ComponentPicker = () => {
    switch (openIndex) {
      case null:
        return (
          <div className="p-4 flex items-center justify-center">
            <Loader />
          </div>
        );
      case 0:
        return <AnimatedFileInput />;
      case 1:
        return (
          <CustomizeCardPreview
            title="Chat Customization"
            description="Customize your chat appearance"
          />
        );
      case 2:
        return <DeployButton />;
    }
  };

  return (
    <div
      className="w-full max-w-screen-xl mx-auto grid gap-8 grid-cols-1 lg:grid-cols-2 px-6 z-0"
      ref={divRef}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h3
          className="text-4xl font-bold mb-8 text-foreground"
          variants={itemVariants}
        >
          Get Started
        </motion.h3>
        <motion.div className="flex flex-col gap-4" variants={itemVariants}>
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              content={item.content}
              isOpen={openIndex === index}
              onClick={() => handleItemClick(index)}
              maxHeight={item.maxHeight}
            />
          ))}
        </motion.div>
      </motion.div>
      <motion.div
        className={cn(
          "bg-slate-300 lg:aspect-auto flex flex-grow w-full relative",
          "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
          "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-30px_#ffffff1f_inset] rounded-tr-sm rounded-bl-sm"
        )}
        variants={previewBoxVariants}
        // initial="hidden"
        // animate={controls}
        // exit={"hidden"}
      >
        <motion.div
          className="w-full flex-grow flex items-center justify-center py-6 justify-self-center"
          variants={itemVariants}
        >
          {<ComponentPicker />}
        </motion.div>
        <PlusIcon
          className="absolute text-white -top-3 -left-3"
          width={24}
          height={24}
        />
        <PlusIcon
          className="absolute text-white -bottom-3 -right-3"
          width={24}
          height={24}
        />
      </motion.div>
    </div>
  );
};

export default Accordion;
