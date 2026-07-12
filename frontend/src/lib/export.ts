import { toast } from "sonner";

export function downloadCSV(
    filename: string,
    rows: Record<string, unknown>[]
) {
    if (!rows?.length) return;

    const headers = Object.keys(rows[0]);

    const csv = [
        headers.join(","),

        ...rows.map((row) =>
            headers
                .map((header) =>
                    JSON.stringify(row[header] ?? "")
                )
                .join(",")
        ),
    ].join("\n");

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    
    toast.success("CSV Exported");
}

export function downloadJSON(
    filename: string,
    data: unknown
) {
    if (!data) return;

    const blob = new Blob(
        [
            JSON.stringify(
                data,
                null,
                2
            ),
        ],
        {
            type: "application/json",
        }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success("JSON Downloaded");
}
