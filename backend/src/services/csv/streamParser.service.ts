import fs from "fs";
import { parse } from "@fast-csv/parse";

export async function streamCSVInBatches(
    filePath: string,
    batchSize: number,
    onBatch: (rows: Record<string, any>[]) => Promise<void>
): Promise<number> {

    return new Promise((resolve, reject) => {

        let totalRows = 0;

        let batch: Record<string, any>[] = [];

        const stream = fs
            .createReadStream(filePath)
            .pipe(
                parse({
                    headers: true,
                    ignoreEmpty: true,
                    trim: true,
                })
            );

        stream.on("error", reject);

        stream.on("data", async (row) => {

            stream.pause();

            batch.push(row);

            totalRows++;

            if (batch.length >= batchSize) {

                const currentBatch = batch;

                batch = [];

                try {

                    await onBatch(currentBatch);

                } catch (err) {

                    reject(err);

                    return;

                }

            }

            stream.resume();

        });

        stream.on("end", async () => {

            try {

                if (batch.length) {

                    await onBatch(batch);

                }

                resolve(totalRows);

            } catch (err) {

                reject(err);

            }

        });

    });

}