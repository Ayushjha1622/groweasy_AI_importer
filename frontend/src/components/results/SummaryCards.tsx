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
            textColor: "text-blue-600 dark:text-blue-400",
            iconColor: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-950/30",
        },
        {
            title: "Imported",
            value: summary.imported,
            icon: CheckCircle2,
            textColor: "text-emerald-600 dark:text-emerald-400",
            iconColor: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-50 dark:bg-emerald-950/30",
        },
        {
            title: "Skipped",
            value: summary.skipped,
            icon: XCircle,
            textColor: "text-rose-600 dark:text-rose-400",
            iconColor: "text-rose-600 dark:text-rose-400",
            bg: "bg-rose-50 dark:bg-rose-950/30",
        },
        {
            title: "Success Rate",
            value: `${summary.successRate}%`,
            icon: TrendingUp,
            textColor: "text-violet-600 dark:text-violet-400",
            iconColor: "text-violet-600 dark:text-violet-400",
            bg: "bg-violet-50 dark:bg-violet-950/30",
        },
    ];

    return (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="rounded-xl border bg-card p-6 shadow-sm flex items-center justify-between"
                    >
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                {card.title}
                            </p>

                            <h2 className={`mt-2 text-3xl font-bold tracking-tight ${card.textColor}`}>
                                {card.value}
                            </h2>
                        </div>

                        <div className={`rounded-full p-3 ${card.bg}`}>
                            <Icon
                                size={22}
                                className={card.iconColor}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}