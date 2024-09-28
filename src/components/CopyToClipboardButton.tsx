"use client";
import { useState, useEffect } from "react";
import { Clipboard, Check } from "lucide-react";
import { Button } from "./ui/button";

const CopyToClipboardButton = ({ textToCopy }: { textToCopy: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <Button
      variant={"secondary"}
      size={"icon"}
      onClick={handleClick}
      className=" w-min h-min p-2"
    >
      {isCopied ? (
        <Check className="size-4" />
      ) : (
        <Clipboard className="size-4" />
      )}
    </Button>
  );
};

export default CopyToClipboardButton;
