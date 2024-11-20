"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type InspirationCategory =
  | "Frontend"
  | "Backend"
  | "Full Stack"
  | "Mobile"
  | "Desktop"
  | "UI/UX"
  | "Other";

export type InspirationType =
  | "Landing Page"
  | "E-commerce"
  | "Dashboard"
  | "Blog"
  | "Portfolio"
  | "Documentation"
  | "Social Media"
  | "Other";

export type InspirationItem = {
  id: string;
  title: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  tags: string[];
  category?: InspirationCategory;
  type?: InspirationType;
  colors: string[];
  frameworks?: string[];
  libraries?: string[];
  designPatterns?: string[];
  responsive?: boolean;
  accessibility?: boolean;
  performance?: number;
  createdAt: string;
};

type InspirationStore = {
  items: InspirationItem[];
  addItem: (item: Omit<InspirationItem, "id" | "createdAt">) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, item: Partial<InspirationItem>) => void;
};

export const useInspirationStore = create<InspirationStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              ...item,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateItem: (id, updatedItem) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updatedItem } : item,
          ),
        })),
    }),
    {
      name: "inspiration-store",
    },
  ),
);
