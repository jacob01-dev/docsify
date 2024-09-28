import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AccordionItem = ({
  title,
  content,
  isOpen,
  maxHeight = 180,
  onClick,
}: {
  title: string;
  content: string;
  isOpen: boolean;
  maxHeight?: number;
  onClick: () => void;
}) => {
  return (
    <motion.div
      className="p-0.5 rounded-lg relative overflow-hidden cursor-pointer "
      onClick={onClick}
    >
      <motion.div
        className="p-6 rounded-[7px] flex flex-col justify-between relative z-20 transform-gpu bg-black dark:[border:1px_solid_rgba(255,255,255,.1)]"
        animate={{ height: isOpen ? maxHeight : 72 }}
      >
        <div>
          <motion.p
            className="text-xl font-medium w-full flex justify-between items-center"
            animate={{
              color: isOpen ? "rgba(255, 255, 255, 1)" : "rgb(163 163 163)",
            }}
          >
            {title}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-auto"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </motion.svg>
          </motion.p>
          <motion.p
            className="mt-4 text-muted-foreground"
            animate={{ opacity: isOpen ? 1 : 0 }}
          >
            {content}
          </motion.p>
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-0 z-10 bg-gradient-to-br from-white via-[#71717a] to-[#ffffff1f]"
        animate={{ opacity: isOpen ? 1 : 0 }}
      ></motion.div>
      <div className="absolute inset-0 z-0 "></div>
    </motion.div>
  );
};
export default AccordionItem;
