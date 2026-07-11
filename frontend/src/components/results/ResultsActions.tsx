"use client";

import {
    Download,
    FileJson,
    FileSpreadsheet,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useImportStore } from "@/store/import.store";

import {
    downloadCSV,
    downloadJSON,
} from "@/lib/export";
import { generatePDFReport } from "@/lib/pdfExport";

export default function ResultsActions() {
    const result = useImportStore((state) => state.result);

    if (!result) return null;

    return (
        <div className="flex flex-wrap gap-4">

            <Button
                variant="outline"
                className="hover:bg-neutral-100"
                onClick={() => {
                    if (confirm("Export imported records?")) {
                        downloadCSV(
                            "imported-records.csv",
                            result.importedRecords
                        );
                    }
                }}
            >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export CSV
            </Button>

            <Button
                variant="outline"
                className="hover:bg-neutral-100"
                onClick={() => {
                    if (confirm("Export skipped records?")) {
                        downloadCSV(
                            "skipped-records.csv",
                            result.skippedRecords.map((item) => ({
                                ...item.row,
                                reason: item.reason,
                            }))
                        );
                    }
                }}
            >
                <FileSpreadsheet className="mr-2 h-4 w-4 text-red-500" />
                Skipped CSV
            </Button>

            <Button
                variant="outline"
                className="hover:bg-neutral-100"
                onClick={() => {
                    if (confirm("Export JSON summary?")) {
                        downloadJSON(
                            "summary.json",
                            result
                        );
                    }
                }}
            >
                <FileJson className="mr-2 h-4 w-4" />
                Export JSON
            </Button>

            <Button
                variant="outline"
                className="hover:bg-neutral-100"
                onClick={() => {
                    if (confirm("Generate PDF Report?")) {
                        generatePDFReport(result, "report.pdf");
                    }
                }}
            >
                <Download className="mr-2 h-4 w-4" />
                Export PDF
            </Button>

            <Button
                className="bg-black text-white hover:bg-neutral-800"
                onClick={() => {
                    if (confirm("Print this report?")) {
                        window.print();
                    }
                }}
            >
                <Download className="mr-2 h-4 w-4" />
                Print Report
            </Button>

        </div>
    );
}