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

            <div className="rounded-xl border p-6">

                <h2 className="text-xl font-semibold">
                    Skipped Records
                </h2>

                <p className="mt-4 text-green-600">
                    No skipped records 🎉
                </p>

            </div>

        );

    }

    return (

        <div className="rounded-xl border">

            <div className="border-b p-5">

                <h2 className="text-xl font-semibold">
                    Skipped Records
                </h2>

            </div>

            <div className="space-y-3 p-5">

                {rows.map((record, index) => (

                    <div
                        key={index}
                        className="rounded-lg border p-4"
                    >

                        <p className="font-medium text-red-600">

                            {record.reason}

                        </p>

                        <pre className="mt-3 overflow-auto rounded bg-muted p-3 text-sm">

                            {JSON.stringify(record.row, null, 2)}

                        </pre>

                    </div>

                ))}

            </div>

        </div>

    );

}