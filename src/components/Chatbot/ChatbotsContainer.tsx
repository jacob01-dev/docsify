"use client";
import CreateChatbot from "./CreateChatbot";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";
import ChatbotCard from "./ChatbotCard";
import { AlertCircle, ArrowRight, Plus, MessageSquare } from "lucide-react";
import useGetSubscription from "@/hooks/useGetSubscription";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import CreateChatbotCard from "./CreateChatbotCard";

const ChatbotsContainer = (): JSX.Element => {
  const supabase = createClient();
  const [chatbots, setChatbots] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionRequirements, setSubscriptionRequirements] = useState<{
    isSubscribed: boolean;
    maxChatbots: number;
    canCreateChatbot: boolean;
  }>({
    isSubscribed: false,
    maxChatbots: 0,
    canCreateChatbot: false,
  });
  const [subscription, setSubscription] = useState<any>();
  useGetSubscription({ setSubscription: setSubscription });

  const fetchChatbots = useCallback(async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;
    if (!user) return [];

    const { data, error } = await supabase
      .from("chatbots")
      .select("*")
      .eq("user", user.id);

    if (error) {
      console.error("Error fetching chatbots:", error);
      return [];
    }

    return data || [];
  }, [supabase]);

  const updateSubscriptionRequirements = useCallback(() => {
    if (subscription) {
      setSubscriptionRequirements({
        isSubscribed: subscription.isSubscribed,
        maxChatbots: subscription.chatbots,
        canCreateChatbot: chatbots.length < subscription.chatbots,
      });
    }
  }, [subscription, chatbots.length]);

  useEffect(() => {
    const updateState = async () => {
      setIsLoading(true);
      const fetchedChatbots = await fetchChatbots();
      setChatbots(fetchedChatbots);
      setIsLoading(false);
    };

    updateState();
  }, [fetchChatbots]);

  useEffect(() => {
    updateSubscriptionRequirements();
  }, [updateSubscriptionRequirements]);

  return (
    <div className="w-full h-full flex gap-y-4 gap-x-6 flex-col lg:flex-row items-center lg:items-start">
      {chatbots.length <= 0 ? (
        subscription && subscriptionRequirements.isSubscribed ? (
          <CreateChatbotCard chatbots={chatbots} setChatbots={setChatbots} />
        ) : (
          <Card className="flex justify-between flex-col self-center mx-auto my-auto gap-y-2">
            <CardContent className="grid p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Choose a plan</h3>
              </div>
              <p className="text-sm text-gray-300 mt-2">
                To create chatbots, you need to upgrade your plan.
              </p>
            </CardContent>
            <CardFooter className="pt-2">
              <Link href={"/dashboard/payments"} className="w-full">
                <Button className="w-full bg-white text-gray-900 hover:bg-gray-200 transition-colors group">
                  Upgrade Plan
                  <ArrowRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )
      ) : (
        // END OF NO CHATBOTS
        <>
          {chatbots?.map((chatbot, index) => (
            <ChatbotCard
              chatbot_number={index}
              chatbot_public_id={chatbot.public_id}
              setChatbots={setChatbots}
              chatbots={chatbots}
              key={index}
            />
          ))}
          {subscriptionRequirements.canCreateChatbot && (
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
        </>
      )}
      {!subscriptionRequirements.canCreateChatbot && chatbots.length > 0 && (
        <Card className="w-full max-w-[300px] min-h-[200px] max-h-[200px] flex justify-between flex-col">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Chatbot Limit Reached</h3>
            </div>
            <p className="text-sm text-gray-300 mt-2">
              Upgrade your plan to create more and unlock additional features.
            </p>
          </CardContent>
          <CardFooter className="pt-2">
            <Link href={"/dashboard/payments"} className="w-full">
              <Button className="w-full bg-white text-gray-900 hover:bg-gray-200 transition-colors group">
                Upgrade Plan
                <ArrowRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ChatbotsContainer;
