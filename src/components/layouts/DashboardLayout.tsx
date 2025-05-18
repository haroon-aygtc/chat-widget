import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
