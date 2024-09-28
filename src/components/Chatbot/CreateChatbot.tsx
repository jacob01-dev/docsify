"use client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateChatbotStepContainer from "./CreateChatbotStepContainer";
import React, { useState } from "react";

const CreateChatbot = ({
  children,
  setChatbots,
  chatbots,
}: {
  children: React.ReactNode;
  setChatbots: (chatbots: any[]) => void;
  chatbots: any[];
}): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <CreateChatbotStepContainer
        setOpen={setOpen}
        chatbots={chatbots}
        setChatbots={setChatbots}
      />
    </Dialog>
  );
};

export default CreateChatbot;
