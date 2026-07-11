"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { UploadCloud, FileText, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import DropZone from "./Dropzone";

import { useUpload } from "@/hooks/useUpload";
import { useUploadStore } from "@/store/upload.store";

export default function UploadCard() {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { setFile, setFileId } = useUploadStore();

  const uploadMutation = useUpload();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a CSV file.");
      return;
    }

    try {
      const response = await uploadMutation.mutateAsync(selectedFile);
      console.log("Upload response:", response);

      setFileId(response.data.fileId);
      console.log("Uploaded fileId:", response.data.fileId);
      console.log("Stored fileId:", response.data.fileId);

      toast.success("CSV uploaded successfully!");

      router.push("/preview");
    } catch (error) {
      console.error(error);

      toast.error("Upload failed.");
    }
  };

  return (
    <Card className="mx-auto mt-10 max-w-4xl p-8">

      <div className="mb-8 text-center">

        <UploadCloud className="mx-auto mb-4 h-12 w-12 text-primary" />

        <h1 className="text-3xl font-bold">
          Upload CSV
        </h1>

        <p className="mt-2 text-muted-foreground">
          Drag & drop your CSV file or browse from your computer.
        </p>

      </div>

      <DropZone onFileSelect={handleFileSelect} />

      {selectedFile && (
        <div className="mt-6 rounded-xl border p-4">

          <div className="flex items-center gap-3">

            <FileText className="text-primary" />

            <div>

              <p className="font-medium">
                {selectedFile.name}
              </p>

              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>

            </div>

          </div>

        </div>
      )}

      <div className="mt-8 flex justify-end">

        <Button
          size="lg"
          onClick={handleUpload}
          disabled={!selectedFile || uploadMutation.isPending}
        >
          {uploadMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload CSV"
          )}
        </Button>

      </div>

    </Card>
  );
}