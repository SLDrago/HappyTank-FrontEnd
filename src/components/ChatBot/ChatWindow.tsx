import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import axios from "axios";
import ChatbotButton from "./ChatbotButton";

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<
    { sender: "AI" | "You"; message: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = async (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "You", message },
    ]);
    try {
      const response = await axios.post("YOUR_API_ENDPOINT", { message });
      const aiMessage = response.data.reply; // Adjust based on your API response
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "AI", message: aiMessage },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
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
          <div className="flex-1 overflow-y-auto pr-4">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                sender={msg.sender}
                message={msg.message}
              />
            ))}
          </div>
          <ChatInput onSend={handleSendMessage} />
        </div>
      )}
    </>
  );
};

export default ChatWindow;
