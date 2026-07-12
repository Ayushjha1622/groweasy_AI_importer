import fs from "fs";
import { parse } from "@fast-csv/parse";
import { normalizeHeader } from "./headerNormalizer";
import { detectDelimiter } from "./delimiterDetector";

export async function parseCSV(
    filePath: string
): Promise<Record<string, string>[]> {

    const rows: Record<string, string>[] = [];
    const delimiter = detectDelimiter(filePath);

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(
                parse({
                    headers: (headers) => headers.map(h => h ? normalizeHeader(h) : ""),
                    delimiter,
                    ignoreEmpty: true,
                    trim: true,
                })
            )
            .on("error", reject)
            .on("data", (row: Record<string, string>) => {
                rows.push(row);
            })
            .on("end", () => {
                resolve(rows);
            });
    });
}