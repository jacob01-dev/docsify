import { BorderBeam } from "../magicui/border-beam";
import DeleteChatbot from "./DeleteChatbot";
import ChatbotIntegrationPopup from "./ChatbotIntegrationPopup";

const ChatbotCard = ({
  chatbot_number,
  chatbot_public_id,
  setChatbots,
  chatbots,
}: {
  chatbot_number: number;
  chatbot_public_id: string;
  setChatbots: (chatbots: any[]) => void;
  chatbots: any[];
}): JSX.Element => {
  return (
    <div className="relative min-w-[300px] min-h-[200px] max-w-[300px] max-h-[200px] bg-accent grid grid-flow-row rounded-xl cursor-pointer transition-all group">
      <div className="w-full h-min p-4 grid grid-flow-col justify-between items-center z-10">
        <h3 className="text-lg text-muted-foreground">
          Chatbot {chatbot_number + 1}
        </h3>
        <DeleteChatbot
          chatbot_public_id={chatbot_public_id}
          setChatbots={setChatbots}
          chatbots={chatbots}
        />
      </div>
      <ChatbotIntegrationPopup chatbot_public_id={chatbot_public_id} />
      <BorderBeam
        colorFrom="#71717a"
        colorTo="#fff"
        duration={5}
        className="hidden group-hover:block"
      />
    </div>
  );
};

export default ChatbotCard;
