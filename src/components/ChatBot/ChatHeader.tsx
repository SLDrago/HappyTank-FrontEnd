import React from "react";

const ChatHeader: React.FC = () => {
  return (
    <div className="flex flex-col space-y-1.5 pb-4 md:pb-6">
      <h2 className="font-semibold text-lg tracking-tight">AquaPedia Bot</h2>
      <p className="text-sm text-[#6b7280] leading-3">
        Powered by GPT 3.5 turbo
      </p>
    </div>
  );
};

export default ChatHeader;
