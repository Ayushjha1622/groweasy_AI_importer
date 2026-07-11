"use client";

import {
    Database,
    CheckCircle2,
    XCircle,
    TrendingUp,
} from "lucide-react";

import { ImportSummary } from "@/types/import";

interface Props {
    summary: ImportSummary;
}

export default function SummaryCards({
    summary,
}: Props) {

    if (!summary) {
        return <div>No summary available.</div>;
    }

    const cards = [
        {
            title: "Total Records",
            value: summary.total,
            icon: Database,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            title: "Imported",
            value: summary.imported,
            icon: CheckCircle2,
            color: "text-green-600",
            bg: "bg-green-50",
        },
        {
            title: "Skipped",
            value: summary.skipped,
            icon: XCircle,
            color: "text-red-600",
            bg: "bg-red-50",
        },
        {
            title: "Success Rate",
            value: `${summary.successRate}%`,
            icon: TrendingUp,
            color: "text-purple-600",
            bg: "bg-purple-50",
        },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="rounded-xl border bg-card p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    {card.title}
                                </p>

                                <h2 className={`mt-3 text-3xl font-bold ${card.color}`}>
                                    {card.value}
                                </h2>
                            </div>

                            <div className={`rounded-full p-3 ${card.bg}`}>
                                <Icon
                                    size={26}
                                    className={card.color}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}