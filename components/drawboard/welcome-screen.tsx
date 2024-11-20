"use client";

import { motion } from "framer-motion";
import { Eraser, Paintbrush, Pencil } from "lucide-react";

export function WelcomeScreen() {
  const tools = [
    { icon: Paintbrush, delay: 0 },
    { icon: Pencil, delay: 0.2 },
    { icon: Eraser, delay: 0.4 },
  ];

  return (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-6">
          {tools.map((Tool, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: 1,
                rotate: 0,
                y: [0, -15, 0],
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: Tool.delay,
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Tool.delay,
                },
              }}
              className="rounded-full bg-zinc-800/50 p-6 backdrop-blur-sm"
            >
              <Tool.icon className="h-8 w-8 text-zinc-400" />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <motion.h1
            className="text-xl font-medium text-zinc-200 mb-3"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading Drawing Board
          </motion.h1>
          <p className="text-sm text-zinc-400">Preparing your canvas...</p>
        </motion.div>
      </div>
    </div>
  );
}
