import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterOption {
  label: string;
  value: string;
  type: string;
}

interface WidgetFiltersProps {
  activeFilters: FilterOption[];
  onRemoveFilter: (filter: FilterOption) => void;
  onClearFilters: () => void;
}

const WidgetFilters = ({
  activeFilters,
  onRemoveFilter,
  onClearFilters,
}: WidgetFiltersProps) => {
  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm text-muted-foreground">Filters:</span>
      {activeFilters.map((filter) => (
        <Badge
          key={`${filter.type}-${filter.value}`}
          variant="outline"
          className="flex items-center gap-1 px-2 py-1 bg-background hover:bg-background shadow-sm hover:shadow-md transition-all duration-200"
        >
          <span className="text-xs font-medium">
            {filter.type}: {filter.label}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => onRemoveFilter(filter)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="text-xs text-muted-foreground h-7 hover:text-foreground"
        onClick={onClearFilters}
      >
        Clear all
      </Button>
    </div>
  );
};

export default WidgetFilters;
