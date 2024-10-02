"use client";
import React, { useState } from "react";
import {
  animate,
  useMotionTemplate,
  useMotionValue,
  motion,
  AnimatePresence,
  useAnimation,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const faqs = [
  {
    question: "What can I use Docsify for?",
    answer:
      "If you have code documentation on your website, Docsify lets you turn it into a chatbot. It's great for businesses and SaaS platforms to enhance support and user experience.",
  },
  {
    question: "What LLMs are supported?",
    answer:
      "Right now, Docsify supports only GPT-4o and GPT-4o mini, but in the near future we will add support for Claude 3.5 Sonnet.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "For now Docsify supports only PDF files, but we plan to add support for more file formats and links.",
  },
];

const FAQItem = ({
  question,
  answer,
  isOpen,
  toggleOpen,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}) => {
  return (
    <div className="border-b border-gray-700">
      <button
        className="w-full py-6 flex justify-between items-center text-left"
        onClick={toggleOpen}
      >
        <span className="text-gray-200">{question}</span>
        <ChevronDown
          className={`text-gray-400 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(-1);
  const colors = ["#000", "#2c3333", "#2c3333"];
  const color = useMotionValue(colors[0]);
  const bgImage = useMotionTemplate`radial-gradient(50% 100% at 50% 50%, black 30%, ${color})`;
  const controls = useAnimation();
  const divRef = useRef(null);
  const IsInView = useInView(divRef);

  useEffect(() => {
    animate(color, colors, {
      ease: "easeInOut",
      duration: 5,
      delay: 1,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  useEffect(() => {
    if (IsInView) {
      controls.start("visible");
    }
  }, [IsInView]);

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-gray-100 p-8 flex items-center justify-center"
      style={{ backgroundImage: bgImage }}
      ref={divRef}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-y-8"
        >
          <div className="grid gap-y-6">
            <motion.h1
              className="text-5xl font-bold text-center bg-gradient-to-b from-white to-[#71717a] bg-clip-text text-transparent tracking-tight"
              variants={itemVariants}
            >
              Frequently asked questions
            </motion.h1>
            <motion.p
              className="text-base text-muted-foreground text-center px-12"
              variants={itemVariants}
            >
              Everything you need to know about the product.
            </motion.p>
          </div>
          <div className="">
            {faqs.map((faq, index) => (
              <motion.div variants={itemVariants} key={index}>
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={index === openIndex}
                  toggleOpen={() =>
                    setOpenIndex(index === openIndex ? -1 : index)
                  }
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FAQSection;
