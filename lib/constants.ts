import {
  InspirationCategory,
  InspirationType,
} from "@/store/inspiration-store";

export const PREDEFINED_PALETTES = {
  modern: {
    name: "Modern Minimal",
    colors: ["#2D3436", "#636E72", "#B2BEC3", "#DFE6E9"],
  },
  nature: {
    name: "Nature Inspired",
    colors: ["#27AE60", "#2ECC71", "#1ABC9C", "#16A085"],
  },
  sunset: {
    name: "Sunset Vibes",
    colors: ["#E17055", "#FAB1A0", "#FD79A8", "#FF7675"],
  },
  ocean: {
    name: "Ocean Depths",
    colors: ["#0984E3", "#74B9FF", "#00CEC9", "#81ECEC"],
  },
  royal: {
    name: "Royal Purple",
    colors: ["#6C5CE7", "#A29BFE", "#8E44AD", "#9B59B6"],
  },
} as const;

export const CATEGORY_COLORS: Record<InspirationCategory, string> = {
  Frontend: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Backend: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Full Stack":
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Mobile:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  Desktop: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  "UI/UX": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  Other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
} as const;

export const TYPE_COLORS: Record<InspirationType, string> = {
  "Landing Page":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "E-commerce":
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  Dashboard: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  Blog: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300",
  Portfolio: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
  Documentation:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  "Social Media":
    "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-300",
  Other: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300",
} as const;
