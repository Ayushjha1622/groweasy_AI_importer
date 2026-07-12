import fs from "fs";
import csv from "csv-parser";

export async function streamCSV(
    filePath: string
): Promise<Record<string, unknown>[]> {

    return new Promise((resolve, reject) => {

        const rows: Record<string, unknown>[] = [];

        fs.createReadStream(filePath)

            .pipe(csv())

            .on("data", (row) => {

                rows.push(row);

            })

            .on("end", () => {

                resolve(rows);

            })

            .on("error", reject);

    });

}
