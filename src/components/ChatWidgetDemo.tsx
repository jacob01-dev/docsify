"use client";
import { Bot, CircleUser, Send, User } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ChatWidgetDemo = (): JSX.Element => {
  return (
    <motion.div
      className="relative flex items-center flex-col min-h-[550px] w-[250px] border-4 border-gray lg:border-l-[14px] lg:border-b-[10px] rounded-3xl bg-gray-50 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_-5px_20px_10px_4px_rgba(113,113,122,1)] pt-7"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay: 2, duration: 1.5 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
      }}
    >
      <span className="absolute top-0 border border-black bg-black w-28 h-5 rounded-br-xl rounded-bl-xl"></span>
      <span className="absolute -left-2 lg:-left-[10px] top-20  border-4 lg:border-[3px] lg:border-muted-foreground/40 h-10 rounded-md"></span>
      <span className="absolute -left-2 lg:-left-[10px] top-40  border-4 lg:border-[3px] lg:border-foreground/40 h-20 rounded-md"></span>
      <div className="p-2">
        <motion.div
          className="flex flex-col gap-x-4 p-2 rounded-xl rounded-tr-none bg-accent text-foreground"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 3.5, duration: 0.5 }}
          variants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0 },
          }}
        >
          <div className="py-2 antialiased self-end">
            {" "}
            <CircleUser className="w-6 h-6 self-end" />
          </div>
          <div className="p-1">How do I integrate Docsify with my website?</div>
        </motion.div>
      </div>
      <div className="p-2">
        <motion.div
          className="flex flex-col self-end gap-x-4 p-2 rounded-xl rounded-tl-none bg-accent text-foreground"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 5, duration: 0.5 }}
          variants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0 },
          }}
        >
          <div className="py-2 antialiased self-start">
            <Bot className="w-6 h-6" />
          </div>
          <div className="p-1">
            Integrating Docsify with your website is simple and can be done in a
            few steps. Here's how you can do it: ...
            {"\n"}
          </div>
        </motion.div>
      </div>
      <div className="p-2 self-end">
        <motion.div
          className="flex flex-col gap-x-4 p-2 rounded-xl rounded-tr-none bg-accent text-foreground"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 6, duration: 0.5 }}
          variants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0 },
          }}
        >
          <div className="py-2 antialiased self-end">
            {" "}
            <CircleUser className="w-6 h-6 self-end" />
          </div>
          <div className="p-1 self-end">Thanks</div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 w-full max-w-full flex flex-row p-2 gap-x-2 text-background">
        <Input
          type="text"
          className="bg-transparent"
          placeholder="Ask a question..."
        />
        <Button size={"icon"} variant={"ghost"}>
          <Send className="w-6 h-6" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ChatWidgetDemo;
