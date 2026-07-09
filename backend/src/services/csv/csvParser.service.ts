import fs from "fs";

import csv from "csv-parser";

import { normalizeHeader } from "./headerNormalizer";

import { detectDelimiter } from "./delimiterDetector";

export async function parseCSV(

    filePath: string

): Promise<Record<string, string>[]> {

    const rows: Record<string, string>[] = [];

    const separator = detectDelimiter(filePath);

    return new Promise((resolve, reject) => {

        fs.createReadStream(filePath)

            .pipe(csv({

                separator,

                mapHeaders: ({ header }) =>

                    normalizeHeader(header)

            }))

            .on("data", (row) => {

                rows.push(row);

            })

            .on("end", () => {

                resolve(rows);

            })

            .on("error", reject);

    });

}