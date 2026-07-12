import fs from "fs";
import { parse } from "@fast-csv/parse";

export async function streamCSV(
    filePath: string
): Promise<Record<string, unknown>[]> {

    return new Promise((resolve, reject) => {

        const rows: Record<string, unknown>[] = [];

        fs.createReadStream(filePath)
            .pipe(parse({ headers: true, ignoreEmpty: true, trim: true }))
            .on("data", (row: Record<string, any>) => {
                rows.push(row);
            })
            .on("end", () => {
                resolve(rows);
            })
            .on("error", reject);

    });

}
