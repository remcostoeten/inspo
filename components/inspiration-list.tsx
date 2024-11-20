"use client";

import { motion } from "framer-motion";
import { useInspirationStore } from "@/store/inspiration-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Trash2 } from "lucide-react";
import { CATEGORY_COLORS, TYPE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function InspirationList({ searchQuery }: { searchQuery: string }) {
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
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Colors</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item, index) => (
            <motion.tr
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-8 w-8 rounded object-cover"
                    />
                  )}
                  {item.title}
                </div>
              </TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                {item.category && (
                  <Badge className={cn("font-normal", CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Other)}>
                    {item.category}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {item.type && (
                  <Badge className={cn("font-normal", TYPE_COLORS[item.type] || TYPE_COLORS.Other)}>
                    {item.type}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {item.colors.map((color) => (
                    <div
                      key={color}
                      className="h-4 w-4 rounded-full border"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell>
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
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}