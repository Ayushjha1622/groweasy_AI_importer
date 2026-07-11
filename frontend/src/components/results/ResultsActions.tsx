"use client";

import { Download, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useImportStore } from "@/store/import.store";

export default function ResultsActions() {

    const router = useRouter();

    const result = useImportStore(
        state => state.result
    );

    function downloadReport() {

        if (!result) return;

        const blob = new Blob(

            [
                JSON.stringify(result, null, 2)
            ],

            {
                type: "application/json"
            }

        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "import-report.json";

        link.click();

        URL.revokeObjectURL(url);

    }

    return (

        <div className="flex justify-end gap-4">

            <Button
                variant="outline"
                onClick={() =>
                    router.push("/upload")
                }
            >

                <Upload className="mr-2 h-4 w-4" />

                Import Another File

            </Button>

            <Button
                onClick={downloadReport}
            >

                <Download className="mr-2 h-4 w-4" />

                Download Report

            </Button>

        </div>

    );

}