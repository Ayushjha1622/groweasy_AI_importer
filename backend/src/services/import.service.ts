import fs from "fs";
import path from "path";
import pLimit from "p-limit";

import { AppError } from "../utils/AppError";

import { parseCSV } from "./csv/csvParser.service";
import { createBatches } from "./ai/batchProcessor";
import { mistralService } from "./ai/mistral.service";

class ImportService {

    async importCSV(fileId: string) {

        const filePath = path.join(
            process.cwd(),
            "src",
            "uploads",
            fileId
        );

        if (!fs.existsSync(filePath)) {
            throw new AppError("Uploaded file not found.", 404);
        }

        const rows = await parseCSV(filePath);

        const batches = createBatches(rows, 50);

        const importedRecords: any[] = [];
        const skippedRecords: any[] = [];

        const limit = pLimit(5);

        console.log(`Processing ${batches.length} batches...`);

        const batchResults = await Promise.allSettled(

            batches.map((batch, index) =>
                limit(async () => {

                    console.log(
                        `Processing batch ${index + 1}/${batches.length}`
                    );

                    return mistralService.extract(batch);

                })
            )

        );

        for (const batchResult of batchResults) {

    if (batchResult.status === "rejected") {

        console.error("Batch failed:", batchResult.reason);

        continue;
    }

    // CRMRecord[]
    const extracted = batchResult.value;

    const validRecords = extracted.filter(record =>

        (record.email?.trim() ?? "") !== "" ||

        (record.mobile_without_country_code?.trim() ?? "") !== ""

    );

    const invalidRecords = extracted.filter(record =>

        (record.email?.trim() ?? "") === "" &&

        (record.mobile_without_country_code?.trim() ?? "") === ""

    );

    importedRecords.push(...validRecords);

    skippedRecords.push(...invalidRecords);

}

        return {

            totalRows: rows.length,

            totalImported: importedRecords.length,

            totalSkipped: skippedRecords.length,

            importedRecords,

            skippedRecords

        };

    }

}

export const importService = new ImportService();