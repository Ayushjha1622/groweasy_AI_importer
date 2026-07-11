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
                        <tr className="border-b bg-muted/50">
                            {headers.map((header) => (
                                <th
                                    key={header}
                                    className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap"
                                >
                                    {formatHeader(header)}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {rows.map((row, index) => (
                            <tr
                                key={index}
                                className="transition-colors hover:bg-muted/30"
                            >
                                {headers.map((header) => (
                                    <td
                                        key={header}
                                        className="px-4 py-3 text-sm whitespace-nowrap text-muted-foreground"
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