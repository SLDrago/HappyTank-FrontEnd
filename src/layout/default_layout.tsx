import React, { ReactNode } from "react";
import NavBar from "../components/NavBar";
import ChatWindow from "../components/ChatBot/ChatWindow";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <NavBar>
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      </NavBar>
      <ChatWindow />
    </>
  );
};

export default DefaultLayout;
