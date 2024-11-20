"use client";

import { useDrawboardStore } from "@/store/drawboard-store";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const Excalidraw = dynamic(
    async () => {
        const mod = await import("@excalidraw/excalidraw");
        return mod.Excalidraw;
    },
    {
        ssr: false,
        loading: () => (
            <div className="flex h-screen w-full items-center justify-center">
                <p className="text-muted-foreground">Loading drawing board...</p>
            </div>
        ),
    },
);

type DrawboardProps = {
    id?: string;
};

export default function Drawboard({ id }: DrawboardProps) {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);
    const { drawings, addDrawing, updateDrawing } = useDrawboardStore();
    const [currentDrawingId] = useState(() => id || crypto.randomUUID());
    const saveTimeoutRef = useRef<NodeJS.Timeout>();

    const saveDrawing = useCallback(() => {
        if (!excalidrawRef.current) return;

        const sceneData = JSON.stringify(excalidrawRef.current.getSceneElements());
        const existingDrawing = drawings.find((d) => d.id === currentDrawingId);

        if (existingDrawing) {
            updateDrawing(currentDrawingId, {
                scene: sceneData,
                updatedAt: new Date().toISOString(),
            });
        } else {
            addDrawing({
                title: "Untitled Drawing",
                scene: sceneData,
            });
        }
    }, [currentDrawingId, drawings, addDrawing, updateDrawing]);

    const handleSaveAndNavigate = useCallback(() => {
        saveDrawing();
        router.push("/drawings");
    }, [saveDrawing, router]);

    // Debounced save on changes
    const debouncedSave = useCallback(() => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        saveTimeoutRef.current = setTimeout(saveDrawing, 1000);
    }, [saveDrawing]);

    // Save drawing state before unmounting
    useEffect(() => {
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
            saveDrawing();
        };
    }, [saveDrawing]);

    // Load initial state
    useEffect(() => {
        setIsMounted(true);

        // Load existing drawing if available
        const existingDrawing = drawings.find((d) => d.id === currentDrawingId);
        if (existingDrawing && excalidrawRef.current) {
            try {
                const elements = JSON.parse(existingDrawing.scene);
                excalidrawRef.current.updateScene({ elements });
            } catch (error) {
                console.error("Failed to parse scene data:", error);
            }
        }
    }, [currentDrawingId, drawings]);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="flex h-[100dvh] flex-col">
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={handleSaveAndNavigate}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="h-4 w-[1px] bg-border" />
                        <Button variant="ghost" size="sm" onClick={handleSaveAndNavigate}>
                            All Drawings
                        </Button>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-sm font-medium">Drawing Board</h1>
                    </div>
                </div>
            </header>
            <div className="flex-1">
                <Excalidraw
                    // @ts-ignore
                    ref={excalidrawRef}
                    initialData={{
                        appState: {
                            viewBackgroundColor: "#131212",
                            theme: "dark",
                            currentItemStrokeColor: "#ffffff",
                            currentItemBackgroundColor: "#ffffff20",
                        },
                        scrollToContent: true,
                    }}
                    onChange={debouncedSave}
                />
            </div>
        </div>
    );
}
