"use client";

import { useImportStore } from "@/store/import.store";

export default function ResultsPage() {

    const result = useImportStore(
        state => state.result
    );

    if (!result) {
        return (
            <p>No import results available.</p>
        );
    }

    return (

        <div className="space-y-8">

            <h1 className="text-3xl font-bold">
                Import Results
            </h1>

            <div className="grid grid-cols-4 gap-4">

                <div className="rounded-lg border p-6">
                    <h2 className="text-sm text-muted-foreground">
                        Total Records
                    </h2>

                    <p className="mt-2 text-3xl font-bold">
                        {result.total}
                    </p>
                </div>

                <div className="rounded-lg border p-6">
                    <h2 className="text-sm text-muted-foreground">
                        Imported
                    </h2>

                    <p className="mt-2 text-3xl font-bold text-green-600">
                        {result.imported}
                    </p>
                </div>

                <div className="rounded-lg border p-6">
                    <h2 className="text-sm text-muted-foreground">
                        Skipped
                    </h2>

                    <p className="mt-2 text-3xl font-bold text-red-600">
                        {result.skipped}
                    </p>
                </div>

                <div className="rounded-lg border p-6">
                    <h2 className="text-sm text-muted-foreground">
                        Success Rate
                    </h2>

                    <p className="mt-2 text-3xl font-bold">
                        {result.successRate}%
                    </p>
                </div>

            </div>

        </div>

    );
}