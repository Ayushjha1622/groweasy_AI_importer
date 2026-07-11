"use client";

import { LucideIcon } from "lucide-react";

interface Props {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
    bg: string;
}

export default function StatsCard({
    title,
    value,
    icon: Icon,
    color,
    bg,
}: Props) {
    return (
        <div className="rounded-xl border bg-card p-6 shadow-sm">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    {title === "Average Success" ? (
                        <div className="mt-3">
                            <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/40 px-3 py-1 text-sm font-semibold text-green-700 dark:text-green-400">
                                🟢 {value} Excellent
                            </span>
                        </div>
                    ) : (
                        <h2 className={`mt-3 text-3xl font-bold ${color}`}>
                            {value}
                        </h2>
                    )}

                </div>

                <div className={`rounded-full p-3 ${bg}`}>

                    <Icon
                        className={color}
                        size={26}
                    />

                </div>

            </div>

        </div>
    );
}
