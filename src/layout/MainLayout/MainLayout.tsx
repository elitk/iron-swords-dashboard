import React, { ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 bg-gray-100 flex-1 p-7">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
