"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { PREDEFINED_PALETTES } from "@/lib/constants";

interface ColorPickerProps {
  colors: string[];
  onChange: (colors: string[]) => void;
}

export function ColorPicker({ colors, onChange }: ColorPickerProps) {
  const [color, setColor] = useState("#000000");

  const addColor = (newColor: string) => {
    if (!colors.includes(newColor)) {
      onChange([...colors, newColor]);
    }
  };

  const removeColor = (colorToRemove: string) => {
    onChange(colors.filter((c) => c !== colorToRemove));
  };

  const addPalette = (paletteColors: string[]) => {
    const newColors = [...new Set([...colors, ...paletteColors])];
    onChange(newColors);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {colors.map((c) => (
          <div key={c} className="relative group">
            <div
              className="h-8 w-8 rounded-md border cursor-pointer"
              style={{ backgroundColor: c }}
            />
            <button
              className="absolute -top-1 -right-1 hidden group-hover:flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground"
              onClick={() => removeColor(c)}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              aria-label="Pick color"
            >
              +
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3">
            <HexColorPicker
              color={color}
              onChange={setColor}
            />
            <Button
              className="mt-2 w-full"
              onClick={() => addColor(color)}
            >
              Add Color
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Predefined Palettes</h4>
        <div className="grid gap-2">
          {Object.entries(PREDEFINED_PALETTES).map(([key, palette]) => (
            <Button
              key={key}
              variant="outline"
              className="flex items-center justify-between w-full"
              onClick={() => addPalette(palette.colors)}
            >
              <span>{palette.name}</span>
              <div className="flex gap-1">
                {palette.colors.map((c) => (
                  <div
                    key={c}
                    className="h-4 w-4 rounded-full border"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}