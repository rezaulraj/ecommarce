import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        userRole="admin" // Replace with dynamic role management
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <Outlet /> {/* Render nested routes here */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
