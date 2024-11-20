"use client";

import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDrawboardStore } from "@/store/drawboard-store";
import { motion } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

export function DrawingsGrid() {
  const { drawings, removeDrawing } = useDrawboardStore();

  if (!drawings.length) {
    return (
      <EmptyState
        title="No drawings yet"
        description="Create your first drawing to get started"
        buttonText="Create Drawing"
        onButtonClick={() => (window.location.href = "/drawboard")}
      />
    );
  }

  return (
    <div className="container py-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {drawings.map((drawing) => (
          <motion.div
            key={drawing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{drawing.title}</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/drawboard/${drawing.id}`}>
                      <Edit2 className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDrawing(drawing.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Last updated: {new Date(drawing.updatedAt).toLocaleDateString()}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
