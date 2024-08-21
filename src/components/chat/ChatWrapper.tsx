"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Send, Sparkles, User } from "lucide-react";
import { Button } from "../ui/button";
import TextareaAutosize from "react-textarea-autosize";
import TypingAnimation from "../magicui/typing-animation";
import "./Chat.modules.css";
import Spinner from "../Spinner";

const ChatWrapper = ({ chatbot_id }: { chatbot_id: string }): JSX.Element => {
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    keepLastMessageOnError: true,
    body: {
      chatbot_id: chatbot_id,
    },

    onResponse: () => {
      console.log("Streaming began");
    },

    onFinish: () => {
      console.log("Streaming finished");
      setIsStreaming(false);
      setAwaitingResponse(false);
      // End streaming when the response is complete
    },

    onError: () => {
      setErrorMsg("Something went wrong. Please try again.");
    },
  });

  return (
    <MaxWidthWrapper className="min-h-screen flex items-stretch">
      <div className="w-full relative min-h-full flex bg-muted">
        <div className="w-full max-h-screen p-4 flex flex-col gap-y-4 overflow-y-scroll pb-32">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex items-center ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "user" ? (
                <div className="flex items-center gap-x-3 flex-row-reverse">
                  <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="p-3 bg-blue-500 text-white rounded-lg shadow max-w-xs lg:max-w-xl">
                    {message.content}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-x-3 max-w-prose">
                  <div className="w-10 h-10 bg-card-foreground text-white flex items-center justify-center rounded-full">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="p-3 bg-card-foreground text-white rounded-lg shadow max-w-[23rem] lg:max-w-xl gap-y-4">
                    {/* Conditionally render TypingAnimation or Spinner based on the streaming status */}
                    {isStreaming &&
                    index === messages.length - 1 &&
                    messages.length <= 0 ? (
                      <Spinner />
                    ) : (
                      <TypingAnimation
                        text={errorMsg.length >= 0 ? message.content : errorMsg}
                        className="text-base"
                        duration={10}
                        setIsStreaming={setIsStreaming}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full h-min p-4 flex items-center justify-center flex-row absolute bottom-0 border-t border-border bg-muted">
          <form
            onSubmit={() => {
              setIsStreaming(true);
              handleSubmit();
            }}
            className="flex flex-row items-center justify-center gap-x-4 w-full"
          >
            <TextareaAutosize
              name="prompt"
              value={input}
              onChange={handleInputChange}
              className="resize-none text-base py-3 pr-6 pl-3 scrollbar-thumb-black scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-grow border border-border focus:outline focus:outline-black focus:outline-2 rounded-sm"
              rows={1}
              maxRows={4}
              placeholder="Type your question here..."
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  input.trim().length > 0
                ) {
                  e.preventDefault();
                  setIsStreaming(true);

                  handleSubmit(e);
                }
              }}
            />
            <Button
              type="submit"
              size={"icon"}
              className="p-2 flex-shrink-0"
              disabled={isStreaming || input.trim().length <= 0} // Disable button if loading or streaming
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ChatWrapper;
