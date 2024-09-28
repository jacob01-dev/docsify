import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedFileInput: React.FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList): void => {
    const file = files[0];
    if (file.type === "application/pdf") {
      setFileName(file.name);
      // Handle file upload here
    } else {
      setFileName("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
        Upload your Code Documentation
      </p>
      <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
        (.pdf)
      </p>
      <div className="relative w-full mt-10 max-w-xl mx-auto">
        <motion.div
          className="relative group-hover/file:shadow-2xl z-40 bg-neutral-900 flex items-center justify-center h-[10rem] mt-4 w-full max-w-[10rem] mx-auto rounded-md shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
          whileHover={{
            scale: 1.05,
            backgroundColor: "#71717a",
            transition: { duration: 0.3 },
          }}
          animate={{
            scale: fileName ? 1.05 : 1,
            backgroundColor: fileName ? "#71717a" : "#ffffff1f",
            boxShadow: isHovering
              ? "0px 0px 20px rgba(0, 0, 0, 0.1)"
              : "0px 10px 50px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <AnimatePresence>
            {isHovering ||
              (fileName && (
                <motion.div
                  className="absolute inset-0 bg-[#ffffff1f] rounded-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
          </AnimatePresence>
          <motion.div
            animate={{
              rotate: isHovering && !fileName ? 360 : 0,
              scale: isHovering ? [1, 1.2, 1] : 1,
            }}
            transition={{
              rotate: { duration: 0.5, ease: "easeInOut" },
              scale: { duration: 1, repeat: Infinity, repeatType: "reverse" },
            }}
          >
            {fileName ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-8 w-8 text-neutral-600 dark:text-neutral-300"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="m9 15 2 2 4-4" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-neutral-600 dark:text-neutral-300"
              >
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                <path d="M7 9l5 -5l5 5"></path>
                <path d="M12 4l0 12"></path>
              </svg>
            )}
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute border border-dashed border-neutral-400 inset-0 z-30 bg-transparent flex items-center justify-center h-[10rem] mt-4 w-full max-w-[10rem] mx-auto rounded-md"
          animate={{
            opacity: isDragging ? 1 : 0,
            scale: isDragging ? [1, 1.05, 1] : 1,
          }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 1, repeat: Infinity },
          }}
        />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf"
      />
      <AnimatePresence>
        {fileName && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-sm text-neutral-600 dark:text-neutral-400"
          >
            {fileName}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedFileInput;
