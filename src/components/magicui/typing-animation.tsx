"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import parse from "html-react-parser";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
  setIsStreaming?: (isStreaming: boolean) => void;
}

export default function TypingAnimation({
  text,
  duration = 200,
  className,
  setIsStreaming,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, i]);

  return (
    <h1 className={cn("flex flex-col gap-y-4 py-2 px-1", className)}>
      {displayedText ? parse(displayedText.trim()) : text}
    </h1>
  );
}
