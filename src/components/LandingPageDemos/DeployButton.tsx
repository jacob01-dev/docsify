import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const DeployButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    let interval: any;
    if (isPressed && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1.75, 100));
      }, 30);
    } else if (!isPressed && progress > 0 && !isComplete) {
      interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 0.5, 0));
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isPressed, progress, isComplete]);

  useEffect(() => {
    if (progress === 100) {
      setIsComplete(true);
      setIsPressed(false);
    }
  }, [progress]);

  const handlePress = () => {
    if (!isComplete) {
      setIsPressed(true);
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.5, repeat: Infinity },
      });
    }
  };

  const handleRelease = () => {
    if (!isComplete) {
      setIsPressed(false);
      controls.stop();
    }
  };

  const generateParticles = () => {
    return [...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-green-400 rounded-full"
        initial={{
          x: "50%",
          y: "50%",
          opacity: 1,
        }}
        animate={{
          x: `${Math.random() * 100 - 50}%`,
          y: `${Math.random() * -100 - 50}%`,
          opacity: 0,
          scale: 0,
        }}
        transition={{
          duration: Math.random() * 1 + 0.5,
          ease: "easeOut",
        }}
      />
    ));
  };

  const generateLightning = () => {
    return [...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-0.5 h-6 bg-green-300"
        style={{
          left: `${(i / 12) * 100}%`,
          top: i % 2 === 0 ? "-12px" : "auto",
          bottom: i % 2 !== 0 ? "-12px" : "auto",
          transform: `rotate(${Math.random() * 30 - 15}deg)`,
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{
          scaleY: [0, 1, 0],
          opacity: [0, 1, 0],
          x: [0, Math.random() * 10 - 5, 0],
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          repeatType: "loop",
          delay: i * 0.1,
        }}
      />
    ));
  };

  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 bg-green-500 opacity-20 rounded-lg filter blur-xl"
        animate={controls}
      />
      <Button
        className={`relative overflow-hidden w-56 h-20 text-xl font-bold bg-transparent backdrop-blur-sm border ${
          isComplete ? "border-green-500 " : "border-green-700 "
        } text-white hover:bg-transparent/50 hover:text-green-300 transition-colors duration-300`}
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onMouseLeave={handleRelease}
        onTouchStart={handlePress}
        onTouchEnd={handleRelease}
        disabled={isComplete}
      >
        <motion.span
          className={cn("relative z-10 flex items-center justify-center")}
          animate={isComplete ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          {isComplete ? (
            <CheckCircle2 className="mr-2 h-6 w-6 text-white" />
          ) : isPressed ? (
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          ) : null}
          <span className={isComplete ? "text-white font-extrabold" : ""}>
            {isComplete ? "Deployed" : isPressed ? "Deploying..." : "Deploy"}
          </span>
        </motion.span>
        <motion.div
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-green-600 to-green-400"
          )}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1 }}
          style={{ originX: 0 }}
        />
      </Button>
      {!isComplete && (
        <motion.div
          className="absolute inset-0 bg-green-400 opacity-0 rounded-lg -z-10"
          animate={{
            opacity: [0, 0.2, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      )}
    </div>
  );
};

export default DeployButton;
