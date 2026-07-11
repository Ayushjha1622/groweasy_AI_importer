"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { useUploadStore } from "@/store/upload.store";
import { useImport } from "@/hooks/useImport";

import ProcessingHeader from "@/components/processing/ProcessingHeader";
import ProgressCard from "@/components/processing/ProgressCard";
import ProcessingLogs from "@/components/processing/ProcessingLogs";
import { useImportStore } from "@/store/import.store";
import { toast } from "sonner";

export default function ProcessingPage() {
  const router = useRouter();

  const fileId = useUploadStore((state) => state.fileId);
  const setResult = useImportStore((state) => state.setResult);

  const mutation = useImport();

  const started = useRef(false);

  const [progress, setProgress] = useState(0);
  const [isError, setIsError] = useState(false);

  const [logs, setLogs] = useState<string[]>(["Preparing import..."]);



useEffect(() => {

    console.log("useEffect started");

    if (!fileId) {
        console.log("No fileId");
        router.replace("/upload");
        return;
    }

    if (started.current) {
        console.log("Already started");
        return;
    }

    started.current = true;

    console.log("Calling mutate...");

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        const increment = Math.max(1, Math.floor((95 - prev) / 10));
        return prev + increment;
      });
    }, 1000);

    setLogs([
        "Preparing import...", 
        "Sending data to AI for processing...", 
        "Please wait, AI extraction can take up to a minute..."
    ]);
    
    mutation.mutateAsync(fileId).then((data) => {
        clearInterval(progressInterval);
        setProgress(100);
        setLogs(prev => [...prev, "Import completed successfully!"]);
        
        setTimeout(() => {
            console.log("SUCCESS", data);
            toast.success("Import Completed Successfully");
            setResult(data);
            router.push("/results");
        }, 800);
    }).catch((error) => {
        clearInterval(progressInterval);
        const errorMsg = (error as any)?.response?.data?.message || (error as any)?.message || "";
        
        let specificError = "Error occurred during import.";
        if (errorMsg.toLowerCase().includes("network") || (error as any)?.code === "ERR_NETWORK") {
            specificError = "Network disconnected. Please check your connection.";
        } else {
            specificError = "AI service unavailable. Please try again later.";
        }
        
        setLogs(prev => [...prev, specificError]);
        console.error("ERROR", error);
        setIsError(true);
        
        // Let's also dispatch a toast for better visibility
        toast.error(specificError);
    });

}, [fileId, mutation, router, setResult]);
  return (
    <div className="space-y-8">
      <ProcessingHeader />

      <ProgressCard value={progress} />

      <ProcessingLogs logs={logs} />
      
      {isError && (
        <div className="flex justify-center mt-6">
          <Button 
            onClick={() => router.push("/upload")} 
            variant="destructive"
            size="lg"
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
