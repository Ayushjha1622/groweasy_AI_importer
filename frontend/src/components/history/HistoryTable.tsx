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

                <thead className="bg-muted">

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
                            className="hover:bg-muted/50"
                        >

                            <td className="px-4 py-3">

                                {row.fileName}

                            </td>

                            <td className="px-4 py-3">

                                {row.total}

                            </td>

                            <td className="px-4 py-3 text-green-600">

                                {row.imported}

                            </td>

                            <td className="px-4 py-3 text-red-600">

                                {row.skipped}

                            </td>

                            <td className="px-4 py-3">

                                {row.successRate}%

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