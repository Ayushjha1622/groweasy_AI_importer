"use client";

import { useImportStore } from "@/store/import.store";

export default function ResultsHeader() {
    const result = useImportStore((state) => state.result);

    if (!result) return null;

    const { imported, skipped } = result;

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold flex items-center gap-2">
                ✅ Import Completed Successfully
            </h1>
            <p className="text-muted-foreground text-lg">
                <span className="font-medium text-black">{imported}</span> records imported &middot; <span className="font-medium text-black">{skipped}</span> skipped
            </p>
        </div>
    );
}