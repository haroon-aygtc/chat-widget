import React from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <Header
          title="Dashboard"
          description="Welcome to the ChatWidget Pro admin panel"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Widgets</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage your AI-powered chat widgets</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Models</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Configure and manage AI models</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage users, roles and permissions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
