"use client";

interface Props {
    rows: Record<string, unknown>[];
}

export default function ImportedTable({
    rows,
}: Props) {

    if (rows.length === 0) {
        return null;
    }

    const columns = Object.keys(rows[0]);

    return (

        <div className="rounded-xl border shadow-sm">

            <div className="border-b p-5">

                <h2 className="text-xl font-semibold">
                    Imported Records
                </h2>

            </div>

            <div className="max-h-[500px] overflow-auto">

                <table className="w-full">

                    {/* Sticky Header */}
                    <thead className="sticky top-0 bg-muted z-10">

                        <tr>

                            {columns.map(column => (

                                <th
                                    key={column}
                                    className="px-4 py-3 text-left text-sm font-medium"
                                >
                                    {column}
                                </th>

                            ))}

                        </tr>

                    </thead>

                    {/* Row Divider */}
                    <tbody className="divide-y">

                        {rows.map((row, index) => (

                            <tr
                                key={index}
                                className="transition-colors hover:bg-muted/50"
                            >

                                {columns.map(column => (

                                    <td
                                        key={column}
                                        className="px-4 py-3 text-sm"
                                    >
                                        {String(row[column] ?? "")}
                                    </td>

                                ))}

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}