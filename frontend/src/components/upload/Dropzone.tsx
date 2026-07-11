"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface DropZoneProps {
  onFileSelect: (file: File) => void;
}

export default function DropZone({
  onFileSelect,
}: DropZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      multiple: false,
      accept: {
        "text/csv": [".csv"],
      },
      onDrop,
    });

  return (
    <div
      {...getRootProps()}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 sm:p-12 md:p-16 transition-colors ${
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50"
      }`}
    >
      <input {...getInputProps()} />

      <UploadCloud className="mb-4 h-12 w-12 text-primary" />

      <h2 className="text-xl font-semibold">
        Drag & Drop CSV Here
      </h2>

      <p className="mt-2 text-muted-foreground">
        or click to browse your files
      </p>
    </div>
  );
}