"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Drawing = {
  id: string;
  title: string;
  scene: string;
  createdAt: string;
  updatedAt: string;
  collaborators?: string[];
};

type DrawboardStore = {
  drawings: Drawing[];
  addDrawing: (drawing: Partial<Drawing>) => void;
  updateDrawing: (id: string, updates: Partial<Drawing>) => void;
  removeDrawing: (id: string) => void;
};

export const useDrawboardStore = create<DrawboardStore>()(
  persist(
    (set) => ({
      drawings: [],
      addDrawing: (drawing) =>
        set((state) => ({
          drawings: [
            ...state.drawings,
            {
              id: crypto.randomUUID(),
              title: drawing.title || "Untitled Drawing",
              scene: drawing.scene || "[]",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              collaborators: drawing.collaborators || [],
            },
          ],
        })),
      updateDrawing: (id, updates) =>
        set((state) => ({
          drawings: state.drawings.map((d) =>
            d.id === id
              ? {
                  ...d,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : d,
          ),
        })),
      removeDrawing: (id) =>
        set((state) => ({
          drawings: state.drawings.filter((d) => d.id !== id),
        })),
    }),
    {
      name: "drawboard-storage",
    },
  ),
);
