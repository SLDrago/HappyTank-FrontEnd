import React, { useState, useEffect } from "react";
import { Card, CardBody, Input, Button } from "@material-tailwind/react";
import ChatBubble from "./ChatBubble";

const ChatWindow: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: `You: ${input}`, isUser: true }];
    setMessages(newMessages);

    // Simulate API call to get bot response
    const botResponse = `Bot: This is a mock response for "${input}"`;
    setMessages([...newMessages, { text: botResponse, isUser: false }]);
    setInput("");
  };

  useEffect(() => {
    // Simulating water ripple animation effect on mount
    const rippleEffect = () => {
      const container = document.getElementById("chat-window");
      if (container) {
        container.classList.add("animate-water-ripple");
        setTimeout(
          () => container.classList.remove("animate-water-ripple"),
          1000
        );
      }
    };
    rippleEffect();
  }, []);

  return (
    <Card
      id="chat-window"
      className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <CardBody>
        <div className="h-80 overflow-y-scroll p-4 bg-chat-bg rounded-lg">
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg.text} isUser={msg.isUser} />
          ))}
        </div>
        <div className="flex mt-4">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 mr-2"
            placeholder="Type your message"
          />
          <Button color="blue" onClick={handleSend}>
            Send
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ChatWindow;
