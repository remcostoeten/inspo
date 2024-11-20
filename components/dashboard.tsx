"use client";

import { motion } from "framer-motion";
import { Grid, List, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AddInspirationDialog } from "./add-inspiration-dialog";
import { InspirationGrid } from "./inspiration-grid";
import { InspirationList } from "./inspiration-list";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Dashboard() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">DevInspire</h1>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search inspirations..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Link href="/drawboard">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" /> Drawboard
                </Button>
              </Link>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add New
              </Button>
              <div className="flex items-center gap-2 border-l pl-4">
                <Button
                  variant={view === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setView("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setView("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        {view === "grid" ? (
          <InspirationGrid searchQuery={searchQuery} />
        ) : (
          <InspirationList searchQuery={searchQuery} />
        )}
      </main>

      <AddInspirationDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
}
