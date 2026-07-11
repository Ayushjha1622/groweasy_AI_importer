"use client";

import { HistoryItem } from "@/services/history.service";

interface Props {

    rows: HistoryItem[];

}

export default function HistoryTable({

    rows,

}: Props) {

    return (

        <div className="rounded-xl border overflow-hidden">

            <table className="w-full">

                <thead className="sticky top-0 bg-background">

                    <tr>

                        <th className="px-4 py-3 text-left">
                            File
                        </th>

                        <th className="px-4 py-3 text-left">
                            Total
                        </th>

                        <th className="px-4 py-3 text-left">
                            Imported
                        </th>

                        <th className="px-4 py-3 text-left">
                            Skipped
                        </th>

                        <th className="px-4 py-3 text-left">
                            Success
                        </th>

                        <th className="px-4 py-3 text-left">
                            Date
                        </th>

                    </tr>

                </thead>

                <tbody className="divide-y">

                    {rows.map(row => (

                        <tr
                            key={row.id}
                            className="transition-colors hover:bg-muted/40"
                        >

                            <td className="px-4 py-3">

                                {row.fileName}

                            </td>

                            <td className="px-4 py-3">

                                {row.total}

                            </td>

                            <td className="px-4 py-3">
                                <span className="font-semibold text-green-600">
                                    {row.imported}
                                </span>
                            </td>

                            <td className="px-4 py-3">
                                <span className="font-semibold text-red-600">
                                    {row.skipped}
                                </span>
                            </td>

                            <td className="px-4 py-3">
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                        row.successRate === 100
                                            ? "bg-green-100 text-green-700"
                                            : row.successRate >= 70
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {row.successRate}%
                                </span>
                            </td>

                            <td className="px-4 py-3">

                                {new Date(
                                    row.createdAt
                                ).toLocaleString()}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}