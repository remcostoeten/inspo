"use client";

import { useDrawboardStore } from "@/store/drawboard-store";
import { Avatar, AvatarFallback } from "./ui/avatar";

type Props = {
  drawingId: string;
};

export function UserList({ drawingId }: Props) {
  const { drawings } = useDrawboardStore();
  const drawing = drawings.find((d) => d.id === drawingId);
  const collaborators = drawing?.collaborators || [];

  return (
    <div className="flex -space-x-2">
      {collaborators.map((user, index) => (
        <Avatar key={index} className="h-8 w-8 border-2 border-background">
          <AvatarFallback>{user.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
