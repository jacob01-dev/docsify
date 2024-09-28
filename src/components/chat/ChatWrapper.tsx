"use client";
import React, { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { Send, User, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import TextareaAutosize from "react-textarea-autosize";
import TypingAnimation from "../magicui/typing-animation";
import "./Chat.modules.css";
import Spinner from "../Spinner";
import Link from "next/link";

const ChatWrapper = ({ chatbot_id }: { chatbot_id: string }): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    keepLastMessageOnError: true,
    body: {
      chatbot_id: chatbot_id,
    },
    onResponse: () => {
      setIsLoading(false);
      setIsStreaming(true);
    },
    onFinish: () => {
      setIsLoading(false);
      setIsStreaming(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    handleSubmit(e);
  };

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }
  }, [error]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [isStreaming, isLoading, messages]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Code Assistant</h1>
        </div>
      </header>

      {/* Chat messages */}
      <div
        ref={messageContainerRef}
        className="flex-grow overflow-y-auto  text-white px-4 py-8"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageSquare className="w-12 h-12 text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Clear doubts, spark clarity!
            </h2>
            <p className="text-gray-400">
              Ask your first question to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="w-full">
                <div className="flex items-start space-x-3 mb-1">
                  <div
                    className={`flex-shrink-0 h-8 w-8 rounded-full ${
                      message.role === "user" ? "bg-blue-600" : "bg-gray-800"
                    } flex items-center justify-center`}
                  >
                    {message.role === "user" ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="font-semibold text-sm text-gray-950">
                    {message.role === "user" ? "You" : "Assistant"}
                  </span>
                </div>
                <div
                  className={`ml-11 px-4 py-3 rounded-lg ${
                    message.role === "user" ? "bg-blue-600" : "bg-gray-800"
                  }`}
                >
                  {message.role === "user" ? (
                    <p className="text-sm">{message.content}</p>
                  ) : (
                    <TypingAnimation
                      text={message.content}
                      className="text-sm"
                      duration={10}
                    />
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="w-full">
                <div className="flex items-start space-x-3 mb-1">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-gray-300" />
                  </div>
                  <span className="font-semibold text-sm">Website</span>
                </div>
                <div className="ml-11 px-4 py-3 rounded-lg bg-gray-800">
                  <Spinner className="w-5 h-5 text-blue-500" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input form */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <form onSubmit={handleFormSubmit} className="flex flex-col">
            <div className="flex items-end space-x-2">
              <TextareaAutosize
                name="prompt"
                value={input}
                onChange={handleInputChange}
                className="flex-grow resize-none rounded-lg border border-gray-300 bg-white text-gray-900 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={1}
                maxRows={4}
                placeholder="Type your message..."
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    input.trim().length > 0
                  ) {
                    e.preventDefault();
                    handleFormSubmit(e as any);
                  }
                }}
              />
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200"
                disabled={isLoading || input.trim().length <= 0}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-2 -mb-2">
              Powered by{" "}
              <Link
                href={"http://localhost:3000"}
                target="_blank"
                className="font-medium text-blue-600 hover:underline"
              >
                Docsify
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatWrapper;
