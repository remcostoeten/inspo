"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDrawboardStore } from "@/store/drawboard-store";
import { ArrowLeft, Moon, Save, Sun } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type HeaderProps = {
  theme: "dark" | "light";
  onThemeToggle: () => void;
  onSave: () => string; // Returns the scene data
};

export function Header({ theme, onThemeToggle, onSave }: HeaderProps) {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const { addDrawing } = useDrawboardStore();

  const handleSave = () => {
    const sceneData = onSave();
    addDrawing({
      title,
      scene: sceneData,
    });
    setTitle("");
    setIsSaveDialogOpen(false);
  };

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="h-4 w-[1px] bg-border" />
            <Button variant="ghost" size="sm" asChild>
              <Link
                href="/drawings"
                className="text-muted-foreground hover:text-foreground"
              >
                All Drawings
              </Link>
            </Button>
          </div>
          <div className="flex-1">
            <h1 className="text-sm font-medium">Drawing Board</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeToggle}
            className="mr-2"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSaveDialogOpen(true)}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Drawing
          </Button>
        </div>
      </header>

      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Drawing</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                placeholder="Enter drawing title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsSaveDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!title}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
