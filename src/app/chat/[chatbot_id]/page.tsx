import ChatWrapper from "@/components/chat/ChatWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const ChatPage = ({
  params,
}: {
  params: { chatbot_id: string };
}): JSX.Element => {
  return <ChatWrapper chatbot_id={params.chatbot_id} />;
};

export default ChatPage;
