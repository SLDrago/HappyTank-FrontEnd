import React, { ReactNode } from "react";
import Sidebar from "../components/Sidebar/Sidebar";

const SettingsLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
                    <main>
                        <div className="p-4 mx-auto max-w-screen-4xl md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default SettingsLayout;