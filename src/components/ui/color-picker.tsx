import React from "react";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal flex items-center gap-2"
        >
          <div
            className="h-4 w-4 rounded-full border"
            style={{ backgroundColor: color }}
          />
          <span>{color}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <HexColorPicker color={color} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
}

interface ColorSwatchProps {
  color: string;
  onClick?: () => void;
  className?: string;
}

export function ColorSwatch({ color, onClick, className }: ColorSwatchProps) {
  return (
    <div
      className={`h-6 w-6 rounded-full border cursor-pointer ${className}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );
}
