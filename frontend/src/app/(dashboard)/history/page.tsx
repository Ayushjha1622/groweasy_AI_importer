"use client";

import { useMemo, useState } from "react";

import { useHistory } from "@/hooks/useHistory";

import HistoryHeader from "@/components/history/HistoryHeader";
import HistoryTable from "@/components/history/HistoryTable";
import SearchBox from "@/components/history/SearchBox";
import SortSelect from "@/components/history/SortSelect";

export default function HistoryPage() {

    const {
        data = [],
        isLoading,
    } = useHistory();

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

        return <p>Loading history...</p>;

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