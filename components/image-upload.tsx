"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Image, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (value?: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onChange(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={cn(
          "relative flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-muted-foreground/50",
          isDragActive && "border-primary",
          className,
        )}
      >
        <input {...getInputProps()} />
        {value ? (
          <>
            <img
              src={value}
              alt="Preview"
              className="h-full w-full rounded-lg object-cover"
            />
            <button
              type="button"
              className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                onChange(undefined);
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Image className="h-8 w-8" />
            <span className="text-sm">
              {isDragActive
                ? "Drop the image here"
                : "Drag & drop or click to upload"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
