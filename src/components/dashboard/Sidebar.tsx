import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  Brain,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  icon,
  label,
  path,
  active = false,
  collapsed = false,
  onClick,
}: SidebarItemProps) => {
  const itemContent = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer",
        active
          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md scale-[1.02]"
          : "hover:bg-muted text-muted-foreground hover:text-foreground",
      )}
      onClick={onClick}
    >
      <div className={cn("text-lg", collapsed ? "mx-auto" : "")}>{icon}</div>
      {!collapsed && <span className="font-medium">{label}</span>}
    </motion.div>
  );

  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Link to={path}>{itemContent}</Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <Link to={path}>{itemContent}</Link>;
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [collapsed, setCollapsed] = useState(false);
  const [activePath, setActivePath] = useState(currentPath);

  useEffect(() => {
    setActivePath(currentPath);
  }, [currentPath]);

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/",
    },
    {
      icon: <MessageSquare size={20} />,
      label: "Widget Management",
      path: "/widgets",
    },
    {
      icon: <Brain size={20} />,
      label: "AI Model Management",
      path: "/ai-models",
    },
    {
      icon: <Users size={20} />,
      label: "User Management",
      path: "/user-management",
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Analytics",
      path: "/analytics",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
    <motion.div
      initial={{ width: collapsed ? 80 : 280 }}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full border-r bg-card shadow-sm relative"
    >
      <div className="absolute -right-3 top-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCollapsed(!collapsed)}
          className="bg-primary text-primary-foreground rounded-full p-1 shadow-md"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </motion.button>
      </div>

      <div
        className={cn(
          "flex items-center gap-2 px-4 py-6 mb-6",
          collapsed ? "justify-center" : "px-6",
        )}
      >
        <div className="bg-gradient-to-r from-primary to-accent rounded-md p-2 shadow-md">
          <Sparkles size={24} className="text-primary-foreground" />
        </div>
        {!collapsed && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold bg-gradient-to-r from-primary to-accent text-gradient"
          >
            ChatWidget Pro
          </motion.h1>
        )}
      </div>

      <div className={cn("flex-1 space-y-1", collapsed ? "px-2" : "px-4")}>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            active={activePath === item.path}
            collapsed={collapsed}
          />
        ))}
      </div>

      <div className="mt-auto pt-4 border-t">
        <div
          className={cn(
            "flex items-center justify-between py-3",
            collapsed ? "px-2" : "px-4",
          )}
        >
          {!collapsed ? (
            <>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">
                    admin@example.com
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-muted-foreground hover:text-foreground"
                onClick={() => console.log("Logout clicked")}
              >
                <LogOut size={18} />
              </motion.button>
            </>
          ) : (
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <div className="mx-auto">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Admin User</p>
                  <p className="text-xs text-muted-foreground">
                    admin@example.com
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
