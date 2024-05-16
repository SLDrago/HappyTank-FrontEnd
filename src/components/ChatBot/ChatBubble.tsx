import React from "react";
import { Chip } from "@material-tailwind/react";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <Chip
        className={`${
          isUser ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        }`}
        value={message}
      />
    </div>
  );
};

export default ChatBubble;
