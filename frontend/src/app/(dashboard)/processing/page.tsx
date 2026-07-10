"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUploadStore } from "@/store/upload.store";
import { useImport } from "@/hooks/useImport";

import ProcessingHeader from "@/components/processing/ProcessingHeader";
import ProgressCard from "@/components/processing/ProgressCard";
import ProcessingLogs from "@/components/processing/ProcessingLogs";
import { useImportStore } from "@/store/import.store";

export default function ProcessingPage() {
  const router = useRouter();

  const fileId = useUploadStore((state) => state.fileId);
  const setResult = useImportStore((state) => state.setResult);

  const mutation = useImport();

  const [progress, setProgress] = useState(0);

  const [logs, setLogs] = useState<string[]>(["Preparing import..."]);

  useEffect(() => {
    if (!fileId) {
      router.replace("/upload");
      return;
    }

    mutation.mutate(fileId, {
onSuccess(data) {

    console.log("Import response:", data);

    setResult(data);

    setProgress(100);

    setLogs(prev => [
        ...prev,
        "Import completed."
    ]);

    setTimeout(() => {
        router.push("/results");
    }, 1000)
  },

      onError() {
        setLogs((prev) => [...prev, "Import failed."]);
      },
    });

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;

        return prev + 10;
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      <ProcessingHeader />

      <ProgressCard value={progress} />

      <ProcessingLogs logs={logs} />
    </div>
  );
}
