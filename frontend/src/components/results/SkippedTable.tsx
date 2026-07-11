"use client";

interface SkippedRecord {
    row: Record<string, unknown>;
    reason: string;
}

interface Props {
    rows: SkippedRecord[];
}

export default function SkippedTable({
    rows,
}: Props) {

    if (rows.length === 0) {
        return (
            <div className="rounded-xl border p-10 text-center bg-card">
                <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                    🎉 No skipped records.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border bg-card">
            <div className="border-b p-5">
                <h2 className="text-xl font-semibold">
                    Skipped Records
                </h2>
            </div>

            <div className="space-y-4 p-5">
                {rows.map((record, index) => (
                    <div
                        key={index}
                        className="rounded-lg border p-4 bg-muted/20"
                    >
                        <p className="font-semibold text-rose-600 dark:text-rose-400 break-words">
                            Reason: {record.reason}
                        </p>

                        <div className="mt-3 overflow-x-auto rounded-lg bg-muted p-3">
                            <pre className="text-xs font-mono leading-relaxed text-muted-foreground whitespace-pre-wrap sm:whitespace-pre">
                                {JSON.stringify(record.row, null, 2)}
                            </pre>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}