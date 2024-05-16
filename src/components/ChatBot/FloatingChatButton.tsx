import React, { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import ChatWindow from "./ChatWindow";

const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="mb-4"
          >
            <ChatWindow />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <IconButton
          color="blue"
          className="rounded-full shadow-lg"
          onClick={toggleChat}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-white" />
        </IconButton>
      </motion.div>
    </div>
  );
};

export default FloatingChatButton;
