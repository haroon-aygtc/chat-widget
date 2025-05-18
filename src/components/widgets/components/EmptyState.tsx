import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyStateProps {
  onCreateWidget: () => void;
}

const EmptyState = ({ onCreateWidget }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed rounded-lg bg-muted/20">
      <div className="p-3 bg-primary/10 rounded-full mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium mb-1">No widgets created yet</h3>
      <p className="text-muted-foreground text-center max-w-md mb-4">
        Create your first AI-powered chat widget to engage with your users and
        provide instant support.
      </p>
      <Button onClick={onCreateWidget}>
        <Plus className="mr-2 h-4 w-4" /> Create Your First Widget
      </Button>
    </div>
  );
};

export default EmptyState;
