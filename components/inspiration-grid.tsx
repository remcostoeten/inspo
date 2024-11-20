"use client";

import { motion } from "framer-motion";
import { useInspirationStore } from "@/store/inspiration-store";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { CATEGORY_COLORS, TYPE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function InspirationGrid({ searchQuery }: { searchQuery: string }) {
  const { items, removeItem } = useInspirationStore();

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="overflow-hidden">
            {item.imageUrl && (
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold">{item.title}</h3>
                <div className="flex gap-2">
                  {item.url && (
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="h-8 w-8"
                    >
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {item.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {item.category && (
                  <Badge className={cn("font-normal", CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Other)}>
                    {item.category}
                  </Badge>
                )}
                {item.type && (
                  <Badge className={cn("font-normal", TYPE_COLORS[item.type] || TYPE_COLORS.Other)}>
                    {item.type}
                  </Badge>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
              {item.colors.length > 0 && (
                <div className="mt-4 flex gap-2">
                  {item.colors.map((color) => (
                    <div
                      key={color}
                      className="h-6 w-6 rounded-full border"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}