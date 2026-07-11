"use client";

import { History } from "lucide-react";

export default function HistoryHeader() {
    return (
        <div className="flex items-center gap-4">

            <div className="rounded-xl bg-primary/10 p-3">

                <History
                    className="h-8 w-8 text-primary"
                />

            </div>

            <div>

                <h1 className="text-4xl font-bold">
                    Import History
                </h1>

                <p className="mt-1 text-muted-foreground">
                    Review all previous CSV imports and their status.
                </p>

            </div>

        </div>
    );
}
