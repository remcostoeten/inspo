"use client";

import type { ExcalidrawProps } from "@excalidraw/excalidraw/types/types";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { DrawboardHeader } from "./drawboard-header";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[100dvh] w-full items-center justify-center">
        <p className="text-muted-foreground">Loading drawing board...</p>
      </div>
    ),
  },
);

export default function Drawboard() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const excalidrawProps: ExcalidrawProps = {
    theme: "dark",
    UIOptions: {
      canvasActions: {
        changeViewBackgroundColor: true,
        clearCanvas: true,
        export: {
          saveFileToDisk: true,
        },
        loadScene: true,
        saveAsImage: true,
        toggleTheme: true,
      },
    },
    initialData: {
      appState: {
        viewBackgroundColor: "#121212",
      },
    },
  };

  return (
    <div className="flex h-[100dvh] flex-col">
      <DrawboardHeader />
      <div className="flex-1">
        <Excalidraw {...excalidrawProps} />
      </div>
    </div>
  );
}
