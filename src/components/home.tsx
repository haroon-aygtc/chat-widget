import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Sidebar from "./dashboard/Sidebar";
import Header from "./dashboard/Header";
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  Users,
  MessageSquare,
  Bot,
  Zap,
  TrendingUp,
  Calendar,
  RefreshCw,
  Filter,
  Download,
  ChevronUp,
} from "lucide-react";

const MotionCard = motion(Card);

const Home = () => {
  // Mock data for dashboard metrics
  const metrics = {
    totalWidgets: 12,
    activeWidgets: 8,
    totalConversations: 1458,
    avgResponseTime: "1.2s",
    totalUsers: 245,
    activeModels: 5,
    growthRate: 18,
  };

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      action: "Widget Created",
      name: "Support Chat",
      user: "John Doe",
      time: "2 hours ago",
      icon: <MessageSquare className="h-4 w-4 text-primary" />,
    },
    {
      id: 2,
      action: "Model Updated",
      name: "GPT-4 Custom",
      user: "Jane Smith",
      time: "5 hours ago",
      icon: <Bot className="h-4 w-4 text-accent" />,
    },
    {
      id: 3,
      action: "Widget Deployed",
      name: "Sales Assistant",
      user: "Mike Johnson",
      time: "1 day ago",
      icon: <Zap className="h-4 w-4 text-secondary" />,
    },
    {
      id: 4,
      action: "User Added",
      name: "Sarah Williams",
      user: "Admin",
      time: "2 days ago",
      icon: <Users className="h-4 w-4 text-green-500" />,
    },
  ];

  const [timeRange, setTimeRange] = useState("week");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <motion.div
          className="space-y-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Header
              title="Dashboard"
              description="Welcome back to your AI Widget Management System"
            />
          </motion.div>

          <motion.div
            variants={item}
            className="flex items-center gap-3 justify-end"
          >
            <div className="bg-muted rounded-lg flex items-center p-1">
              <Button
                variant={timeRange === "day" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setTimeRange("day")}
                className="rounded-lg"
              >
                Day
              </Button>
              <Button
                variant={timeRange === "week" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setTimeRange("week")}
                className="rounded-lg"
              >
                Week
              </Button>
              <Button
                variant={timeRange === "month" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setTimeRange("month")}
                className="rounded-lg"
              >
                Month
              </Button>
            </div>

            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            <MotionCard
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.2 }}
              className="bg-card shadow-sm overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Widgets
                </CardTitle>
                <div className="rounded-full bg-primary/10 p-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold">
                    {metrics.totalWidgets}
                  </div>
                  <div className="flex items-center text-xs text-green-500 font-medium">
                    <ChevronUp className="h-3 w-3" /> 24%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.activeWidgets} currently active
                </p>
                <div className="mt-3 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    style={{
                      width: `${(metrics.activeWidgets / metrics.totalWidgets) * 100}%`,
                    }}
                  />
                </div>
              </CardContent>
            </MotionCard>

            <MotionCard
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.2 }}
              className="bg-card shadow-sm overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-accent" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Conversations
                </CardTitle>
                <div className="rounded-full bg-secondary/10 p-2">
                  <Activity className="h-4 w-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold">
                    {metrics.totalConversations.toLocaleString()}
                  </div>
                  <div className="flex items-center text-xs text-green-500 font-medium">
                    <ChevronUp className="h-3 w-3" /> 12%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Avg. response time: {metrics.avgResponseTime}
                </p>
                <div className="mt-3 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-secondary to-accent rounded-full"
                    style={{ width: "75%" }}
                  />
                </div>
              </CardContent>
            </MotionCard>

            <MotionCard
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.2 }}
              className="bg-card shadow-sm overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <div className="rounded-full bg-accent/10 p-2">
                  <Users className="h-4 w-4 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold">{metrics.totalUsers}</div>
                  <div className="flex items-center text-xs text-green-500 font-medium">
                    <ChevronUp className="h-3 w-3" /> 8%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  +12% from last month
                </p>
                <div className="mt-3 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
                    style={{ width: "65%" }}
                  />
                </div>
              </CardContent>
            </MotionCard>

            <MotionCard
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.2 }}
              className="bg-card shadow-sm overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active AI Models
                </CardTitle>
                <div className="rounded-full bg-blue-500/10 p-2">
                  <Bot className="h-4 w-4 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold">
                    {metrics.activeModels}
                  </div>
                  <div className="flex items-center text-xs text-green-500 font-medium">
                    <ChevronUp className="h-3 w-3" /> 40%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  3 custom models configured
                </p>
                <div className="mt-3 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                    style={{ width: "80%" }}
                  />
                </div>
              </CardContent>
            </MotionCard>
          </motion.div>

          <motion.div
            variants={item}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
          >
            <MotionCard
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.2 }}
              className="col-span-4 bg-card shadow-sm"
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Analytics Overview</CardTitle>
                  <CardDescription>
                    Widget usage and conversation metrics for the past 30 days
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-3.5 w-3.5 mr-1" /> Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-3.5 w-3.5 mr-1" /> Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full flex items-center justify-center rounded-md bg-gradient-to-br from-muted/50 to-muted/20 p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                  <div className="text-center z-10">
                    <LineChart className="h-12 w-12 mx-auto text-primary opacity-80" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Analytics visualization would appear here
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <TrendingUp className="h-3.5 w-3.5 mr-1" /> View Detailed
                      Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </MotionCard>

            <MotionCard
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.2 }}
              className="col-span-3 bg-card shadow-sm"
            >
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest actions performed in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      className="flex items-center p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="mr-4 rounded-full bg-card shadow-sm p-2">
                        {activity.icon}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.action}:{" "}
                          <span className="font-bold">{activity.name}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          by {activity.user} • {activity.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-4 text-primary"
                >
                  View All Activity
                </Button>
              </CardContent>
            </MotionCard>
          </motion.div>

          <motion.div
            variants={item}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
          >
            <MotionCard
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.2 }}
              className="col-span-3 bg-card shadow-sm"
            >
              <CardHeader>
                <CardTitle>Widget Distribution</CardTitle>
                <CardDescription>
                  Distribution of widgets by type and usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full flex items-center justify-center rounded-md bg-gradient-to-br from-muted/50 to-muted/20 p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                  <div className="text-center z-10">
                    <PieChart className="h-12 w-12 mx-auto text-secondary opacity-80" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Distribution chart would appear here
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mr-2" />
                    <span className="text-xs">Support (42%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-secondary mr-2" />
                    <span className="text-xs">Sales (28%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-accent mr-2" />
                    <span className="text-xs">FAQ (18%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-muted-foreground mr-2" />
                    <span className="text-xs">Other (12%)</span>
                  </div>
                </div>
              </CardContent>
            </MotionCard>

            <MotionCard
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.2 }}
              className="col-span-4 bg-card shadow-sm"
            >
              <CardHeader>
                <CardTitle>AI Model Performance</CardTitle>
                <CardDescription>
                  Comparison of AI model performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full flex items-center justify-center rounded-md bg-gradient-to-br from-muted/50 to-muted/20 p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                  <div className="text-center z-10">
                    <BarChart className="h-12 w-12 mx-auto text-accent opacity-80" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Performance comparison would appear here
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="bg-muted/50 p-2 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                    <p className="text-lg font-bold">94.2%</p>
                  </div>
                  <div className="bg-muted/50 p-2 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground">
                      Response Time
                    </p>
                    <p className="text-lg font-bold">1.2s</p>
                  </div>
                  <div className="bg-muted/50 p-2 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground">User Rating</p>
                    <p className="text-lg font-bold">4.8/5</p>
                  </div>
                </div>
              </CardContent>
            </MotionCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
