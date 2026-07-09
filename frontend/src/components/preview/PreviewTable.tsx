import { Card } from "@/components/ui/card";
import { formatHeader } from "@/lib/utils";

interface Props {
    headers: string[];
    rows: Record<string, string>[];
}

export default function PreviewTable({
    headers,
    rows,
}: Props) {
    return (
        <Card className="overflow-hidden">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b bg-muted">

                            {headers.map((header) => (

                                <th
                                    key={header}
                                    className="px-4 py-3 text-left text-sm font-semibold"
                                >
                                    {formatHeader(header)}
                                </th>

                            ))}

                        </tr>

                    </thead>

                    <tbody>

                        {rows.map((row, index) => (

                            <tr
                                key={index}
                                className="border-b"
                            >

                                {headers.map((header) => (

                                    <td
                                        key={header}
                                        className="px-4 py-3 text-sm"
                                    >
                                        {row[header]}
                                    </td>

                                ))}

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </Card>
    );
}