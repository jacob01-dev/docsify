"use client";
import CreateChatbot from "./CreateChatbot";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import ChatbotCard from "./ChatbotCard";
import { Plus } from "lucide-react";

const ChatbotsContainer = (): JSX.Element => {
  const supabase = createClient();
  const [chatbots, setChatbots] = useState<any[]>([]);

  useEffect(() => {
    const getChatbots = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      console.log(user.id);
      const { data, error } = await supabase
        .from("chatbots")
        .select("*")
        .eq("user", user.id);
      if (data) {
        console.log(data);
        setChatbots(data);
      }
    };

    getChatbots();
  }, []);

  return (
    <div className="w-full h-full flex gap-y-4 gap-x-6 flex-col lg:flex-row items-center lg:items-start">
      {chatbots.length <= 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
          <h2 className="text-6xl font-normal text-center">
            There are no chatbots yet.
          </h2>
          <p className="text-2xl text-muted-foreground">
            Try{" "}
            <CreateChatbot chatbots={chatbots} setChatbots={setChatbots}>
              <span className="font-extrabold cursor-pointer transition-all duration-500 relative after:bg-foreground after:absolute after:h-[1px] after:w-0 after:bottom-[-1px] after:left-0 hover:after:w-full after:transition-all after:duration-500 hover:text-foreground">
                creating one
              </span>
            </CreateChatbot>
          </p>
        </div>
      ) : (
        chatbots?.map((chatbot, index) => (
          <ChatbotCard
            chatbot_number={index}
            chatbot_public_id={chatbot.public_id}
            setChatbots={setChatbots}
            chatbots={chatbots}
          />
        ))
      )}
      {chatbots.length > 0 && (
        <CreateChatbot chatbots={chatbots} setChatbots={setChatbots}>
          <div className="min-w-[300px] min-h-[200px] max-w-[300px] max-h-[200px] border border-dashed border-muted-foreground rounded-xl flex flex-col items-center justify-center cursor-pointer gap-y-6 group transition-all duration-300 hover:border-white">
            <div className="p-2 border border-dashed border-muted-foreground rounded-full text-muted-foreground transition-all duration-300 group-hover:text-white group-hover:border-white">
              <Plus className="w-6 h-6" />
            </div>
            <h3 className="text-muted-foreground transition-all duration-300 group-hover:text-white">
              Create new chatbot
            </h3>
          </div>
        </CreateChatbot>
      )}
    </div>
  );
};

export default ChatbotsContainer;
