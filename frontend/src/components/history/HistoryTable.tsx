"use client";

import { HistoryItem } from "@/services/history.service";
import { Badge } from "@/components/ui/badge";

interface Props {
    rows: HistoryItem[];
}

export default function HistoryTable({
    rows,
}: Props) {
    return (
        <div className="rounded-xl border overflow-x-auto bg-card">
            <table className="w-full">
                <thead className="bg-muted/50">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">
                            File
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">
                            Total
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">
                            Imported
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">
                            Skipped
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">
                            Success
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">
                            Date
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y">
                    {rows.map(row => (
                        <tr
                            key={row.id}
                            className="transition-colors hover:bg-muted/30"
                        >
                            <td className="px-4 py-3 text-sm font-medium whitespace-nowrap">
                                {row.fileName}
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">
                                {row.total}
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                    {row.imported}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                                <span className="font-semibold text-rose-600 dark:text-rose-400">
                                    {row.skipped}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                                {row.successRate === 100 ? (
                                    <Badge className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40">
                                        🟢 {row.successRate}% Excellent
                                    </Badge>
                                ) : row.successRate >= 70 ? (
                                    <Badge className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/40">
                                        🟡 {row.successRate}% Good
                                    </Badge>
                                ) : (
                                    <Badge className="bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40">
                                        🔴 {row.successRate}% Poor
                                    </Badge>
                                )}
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">
                                {new Date(row.createdAt).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}