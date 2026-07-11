"use client";

import { useMemo, useState, useEffect } from "react";
import { toast } from "sonner";

import { useHistory } from "@/hooks/useHistory";

import HistoryHeader from "@/components/history/HistoryHeader";
import HistoryTable from "@/components/history/HistoryTable";
import SearchBox from "@/components/history/SearchBox";
import SortSelect from "@/components/history/SortSelect";
import { Skeleton } from "@/components/ui/skeleton";

export default function HistoryPage() {

    const {
        data = [],
        isLoading,
    } = useHistory();

    useEffect(() => {
        if (!isLoading && data.length > 0) {
            toast.success("History Loaded");
        }
    }, [isLoading, data.length]);

    const [search, setSearch] = useState("");

    const [sort, setSort] = useState("newest");

    const filteredHistory = useMemo(() => {

        const filtered = data.filter((item) =>
            item.fileName
                .toLowerCase()
                .includes(search.toLowerCase())
        );

        filtered.sort((a, b) => {

            const first =
                new Date(a.createdAt).getTime();

            const second =
                new Date(b.createdAt).getTime();

            return sort === "newest"
                ? second - first
                : first - second;

        });

        return filtered;

    }, [data, search, sort]);

    if (isLoading) {
        return (
            <div className="space-y-8">
                <Skeleton className="h-12 w-1/3 rounded-xl" />
                <Skeleton className="h-[500px] w-full rounded-xl" />
            </div>
        );
    }

    return (

        <div className="space-y-8">

            <HistoryHeader />

            <div className="flex flex-wrap items-center justify-between gap-4">

                <SearchBox
                    value={search}
                    onChange={setSearch}
                />

                <SortSelect
                    value={sort}
                    onChange={setSort}
                />

            </div>

            {filteredHistory.length === 0 ? (

                <div className="rounded-xl border py-20 text-center">

                    <h2 className="text-2xl font-semibold">
                        No history found
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Try another filename or upload a CSV.
                    </p>

                </div>

            ) : (

                <HistoryTable rows={filteredHistory} />

            )}

        </div>

    );

}