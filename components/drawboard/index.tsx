"use client";

import { useDrawboardStore } from "@/store/drawboard-store";
import { Excalidraw } from "@excalidraw/excalidraw";
import type {
    ExcalidrawImperativeAPI,
    ExcalidrawProps,
} from "@excalidraw/excalidraw/types/types";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Header } from "./header";
import { WelcomeScreen } from "./welcome-screen";

const ExcalidrawWrapper = dynamic(async () => ({ default: Excalidraw }), {
    ssr: false,
    loading: () => <WelcomeScreen />,
});

type Props = {
    id?: string;
};

export function DrawboardComponent({ id }: Props) {
    const [isMounted, setIsMounted] = useState(false);
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);
    const { drawings } = useDrawboardStore();

    useEffect(() => {
        setIsMounted(true);
        if (id) {
            const drawing = drawings.find((d) => d.id === id);
            if (drawing && excalidrawRef.current) {
                const elements = JSON.parse(drawing.scene);
                excalidrawRef.current.updateScene({ elements });
            }
        }
    }, [id, drawings]);

    if (!isMounted) {
        return null;
    }

    const excalidrawProps: ExcalidrawProps = {
        theme,
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
            welcomeScreen: false,
            dockedSidebarBreakpoint: 0,
        },
        initialData: {
            appState: {
                viewBackgroundColor: "#000000",
                theme: "dark",
                currentItemStrokeColor: "#ffffff",
                currentItemBackgroundColor: "#ffffff20",
            },
            elements: [],
        },
        // @ts-ignore
        excalidrawRef: excalidrawRef,
    };

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const handleSave = () => {
        const sceneData = JSON.stringify(excalidrawRef.current?.getSceneElements());
        return sceneData;
    };

    return (
        <div className="flex h-[100dvh] flex-col">
            <Header theme={theme} onThemeToggle={toggleTheme} onSave={handleSave} />
            <div className="flex-1">
                <ExcalidrawWrapper {...excalidrawProps} />
            </div>
        </div>
    );
}
