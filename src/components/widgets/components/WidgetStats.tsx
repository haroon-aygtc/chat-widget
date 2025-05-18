import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Activity, Zap } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
}: StatCardProps) => (
  <Card className="overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-gradient">
        {value}
      </div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
      {trend && (
        <div
          className={`flex items-center mt-2 text-xs ${trend.isPositive ? "text-green-500" : "text-red-500"}`}
        >
          {trend.isPositive ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L12 12.586V7z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 13a1 1 0 10-2 0v-5.586l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L12 7.414V13z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {trend.value}% from last month
        </div>
      )}
    </CardContent>
  </Card>
);

const WidgetStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total Widgets"
        value="12"
        description="Active and inactive widgets"
        icon={<MessageSquare className="h-4 w-4 text-primary" />}
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="Active Conversations"
        value="1,234"
        description="Across all widgets"
        icon={<Activity className="h-4 w-4 text-primary" />}
        trend={{ value: 8, isPositive: true }}
      />
      <StatCard
        title="Users Engaged"
        value="5,678"
        description="Unique users this month"
        icon={<Users className="h-4 w-4 text-primary" />}
        trend={{ value: 3, isPositive: true }}
      />
      <StatCard
        title="Avg. Response Time"
        value="1.2s"
        description="AI response generation"
        icon={<Zap className="h-4 w-4 text-primary" />}
        trend={{ value: 5, isPositive: false }}
      />
    </div>
  );
};

export default WidgetStats;
