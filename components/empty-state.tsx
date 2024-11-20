"use client";

import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";

type EmptyStateProps = {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
};

function getRandomColor() {
  // Base gray color: rgb(122,122,122)
  const baseR = 122;
  const baseG = 122;
  const baseB = 122;

  // Random variation ±20%
  const variation = () => Math.random() * 0.4 - 0.2; // -20% to +20%

  const r = Math.floor(baseR * (1 + variation()));
  const g = Math.floor(baseG * (1 + variation()));
  const b = Math.floor(baseB * (1 + variation()));

  return `rgba(${r},${g},${b},0.8)`;
}

export function EmptyState({
  title,
  description,
  buttonText,
  onButtonClick,
}: EmptyStateProps) {
  const squares = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 30 + 20,
    rotation: Math.random() * 360,
    x: (i % 8) * 15 - 30 + (Math.random() * 20 - 10),
    y: Math.floor(i / 8) * 15 - 30 + (Math.random() * 20 - 10),
    delay: Math.random() * 5,
    duration: Math.random() * 8 + 6,
    color: getRandomColor(),
  }));

  return (
    <div className="relative min-h-[500px] w-full overflow-hidden flex items-center justify-center">
      {squares.map((square) => (
        <motion.div
          key={square.id}
          className="absolute border border-white/80 rounded-sm"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.1, 1],
            rotate: [square.rotation, square.rotation + 10, square.rotation],
          }}
          transition={{
            duration: square.duration,
            repeat: Infinity,
            delay: square.delay,
            ease: "easeInOut",
          }}
          style={{
            width: square.size,
            height: square.size,
            left: `${50 + square.x}%`,
            top: `${50 + square.y}%`,
            transform: `translate(-50%, -50%) rotate(${square.rotation}deg)`,
            backgroundColor: square.color,
          }}
        />
      ))}

      <div className="relative flex flex-col items-center justify-center text-center px-4 z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-4 rounded-full bg-gray-800/80 backdrop-blur-sm"
        >
          <Bookmark className="w-8 h-8 text-gray-400" />
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-semibold text-zinc-200 "
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-400  mb-8 max-w-md"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            onClick={onButtonClick}
            className="bg-[#84cc16] hover:bg-[#65a30d] text-black font-medium px-6 py-3 rounded-md text-lg"
          >
            {buttonText}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
