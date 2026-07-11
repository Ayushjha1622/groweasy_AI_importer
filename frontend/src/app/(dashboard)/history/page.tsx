"use client";

import { useHistory } from "@/hooks/useHistory";

import HistoryTable from "@/components/history/HistoryTable";

export default function HistoryPage() {

    const {

        data,

        isLoading,

    } = useHistory();

    if (isLoading) {

        return (

            <p>

                Loading history...

            </p>

        );

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">

                    Import History

                </h1>

                <p className="text-muted-foreground">

                    View previous imports.

                </p>

            </div>

            <HistoryTable

                rows={data ?? []}

            />

        </div>

    );

}