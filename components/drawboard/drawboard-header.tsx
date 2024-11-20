"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export function DrawboardHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-sm font-medium">Drawing Board</h1>
        </div>
        <Button variant="outline" size="sm" onClick={() => {}}>
          <Save className="mr-2 h-4 w-4" />
          Save Drawing
        </Button>
      </div>
    </header>
  );
}
