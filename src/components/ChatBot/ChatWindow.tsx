import React, { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import axios from "axios";
import ChatbotButton from "./ChatbotButton";
import { Typography } from "@material-tailwind/react";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<
    { sender: "AI" | "You"; message: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: "AI",
          message:
            "Hello! How can I assist you today? If you have any thing to know about fish, you can ask from me.",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, error]);

  const handleSendMessage = async (message: string) => {
    const newMessage = { sender: "You", message };
    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
    setIsTyping(true);
    setError(null);

    const limitedMessages = updatedMessages.slice(-2);

    const history = limitedMessages.map((msg) => ({
      role: msg.sender === "You" ? "user" : "assistant",
      content: msg.message,
    }));

    try {
      const response = await axios.post(`${backEndURL}/api/chat`, {
        message,
        history,
      });

      const aiMessage = response.data.data.choices?.[0]?.message?.content;
      if (aiMessage) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "AI", message: aiMessage },
        ]);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Error sending message. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <ChatbotButton onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div
          style={{
            boxShadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)",
          }}
          className="fixed bottom-20 right-4 md:bottom-[calc(4rem+1.5rem)] md:right-0 md:mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] md:w-[440px] w-[90%] h-[80%] md:h-[634px] flex flex-col"
        >
          <ChatHeader />
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto pr-4">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                sender={msg.sender}
                message={msg.message}
              />
            ))}
            {isTyping && (
              <Typography variant="small" color="gray" className="mt-2">
                Typing...
              </Typography>
            )}
            {error && (
              <Typography variant="small" color="red" className="mt-2">
                {error}
              </Typography>
            )}
            <div ref={bottomRef} />
          </div>
          <ChatInput onSend={handleSendMessage} />
        </div>
      )}
    </>
  );
};

export default ChatWindow;
