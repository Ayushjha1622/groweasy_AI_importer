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
            iconColor: "text-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]",
        },
        {
            title: "Imported",
            value: summary.imported,
            icon: CheckCircle2,
            iconColor: "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]",
        },
        {
            title: "Skipped",
            value: summary.skipped,
            icon: XCircle,
            iconColor: "text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]",
        },
        {
            title: "Success Rate",
            value: `${summary.successRate}%`,
            icon: TrendingUp,
            iconColor: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]",
        },
    ];

    return (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="glass-panel p-6 flex flex-col justify-between rounded-xl relative overflow-hidden group hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-500"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-muted-foreground">
                                {card.title}
                            </p>
                            <Icon size={20} className={card.iconColor} />
                        </div>

                        <div className="mt-4">
                            <h2 className="text-4xl font-bold tracking-tight text-foreground">
                                {card.value}
                            </h2>
                        </div>
                        
                        {/* Subtle gradient glow inside card */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                );
            })}
        </div>
    );
}