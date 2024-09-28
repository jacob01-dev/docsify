import { delay, motion } from "framer-motion";
import { Plus, MessageSquare } from "lucide-react";
import CreateChatbot from "./CreateChatbot";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const buttonAnimationVariants = {
  hidden: { padding: "0px 0px" },
  visible: {
    padding: "12px 24px",
    // transition: { duration: 0.2, delay: 0.3 },
  },
};

const CreateChatbotCard = ({
  chatbots,
  setChatbots,
}: {
  chatbots: any[];
  setChatbots: (chatbots: any[]) => void;
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
      <motion.div
        className="text-center p-8 bg-card rounded-2xl shadow-lg border-border border"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-20 text-white mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
        </motion.div>
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold mb-4 text-foreground"
        >
          There are no chatbots yet
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground mb-8"
        >
          Start by creating your first chatbot
        </motion.p>
        <CreateChatbot chatbots={chatbots} setChatbots={setChatbots}>
          <motion.button
            variants={buttonAnimationVariants}
            className={cn(
              buttonVariants({ variant: "default" }),
              "px-6 py-3 rounded-full font-semibold transition duration-300 flex items-center justify-center mx-auto group"
            )}
            whileHover={{
              padding: "12px 50px",
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
          >
            <Plus
              className="mr-2 transition-all duration-500 group-hover:rotate-180"
              size={20}
            />
            Create Chatbot
          </motion.button>
        </CreateChatbot>
      </motion.div>
    </div>
  );
};

export default CreateChatbotCard;
