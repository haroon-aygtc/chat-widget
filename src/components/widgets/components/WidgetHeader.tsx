import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import Header from "@/components/dashboard/Header";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WidgetHeaderProps {
  onCreateWidget: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isCreating: boolean;
}

const WidgetHeader = memo(function WidgetHeader({
  onCreateWidget,
  searchQuery,
  onSearchChange,
  isCreating,
}: WidgetHeaderProps) {
  return (
    <>
      <Header
        title="Widget Management"
        description="Create, configure and manage your AI-powered chat widgets."
      />

      <div className="flex flex-col sm:flex-row gap-2 w-full justify-end mb-4">
        <div className="relative w-full sm:w-[250px]">
          <Input
            placeholder="Search widgets..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onCreateWidget}
                className="whitespace-nowrap bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Plus className="mr-2 h-4 w-4" /> Create Widget
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a new AI-powered widget</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
});

export default WidgetHeader;
