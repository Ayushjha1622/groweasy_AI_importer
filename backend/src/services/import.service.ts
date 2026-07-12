import fs from "fs";
import path from "path";

import { streamCSV } from "./csv/csvStream.service";

import { mapRow } from "./mapping/ruleMapper";
import { needsAI } from "./mapping/needAI";

import { mistralService } from "./ai/mistral.service";
import { createBatches } from "./ai/batchProcessor";

import { historyService } from "./history.service";

class ImportService {
    async process(fileId: string) {
        console.log("Import Service Started");

        const filePath = path.join(
            process.cwd(),
            "src",
            "uploads",
            fileId
        );

        if (!fs.existsSync(filePath)) {
            throw new Error("Uploaded file not found.");
        }

        console.time("CSV Streaming");

        const rows = await streamCSV(filePath);

        console.timeEnd("CSV Streaming");

        console.log("Rows:", rows.length);

        const batches = createBatches(rows, 50);

        let importedCount = 0;
        const skipped: any[] = [];

        for (const batch of batches) {

            const aiCandidates: any[] = [];

            const mappedRecords = batch.map((row) => {

                const crm = mapRow(row);

                if (needsAI(crm)) {
                    aiCandidates.push(crm);
                }

                return crm;
            });

            let aiRecords: any[] = [];

            if (aiCandidates.length > 0) {

                console.log(
                    `Sending ${aiCandidates.length} rows to AI`
                );

                aiRecords = await mistralService.extract(
                    aiCandidates
                );

                // Cooldown between batches to avoid rate-limiting
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

            let aiIndex = 0;

            mappedRecords.forEach((record) => {

                try {

                    if (needsAI(record)) {
                        const aiRecord = aiRecords[aiIndex++];
                        if (aiRecord) {
                            importedCount++;
                        }
                    } else {
                        importedCount++;
                    }

                } catch (error) {

                    skipped.push({
                        row: record,
                        reason:
                            error instanceof Error
                                ? error.message
                                : "Unknown Error",
                    });

                }

            });

        }

        const successRate =
            rows.length === 0
                ? 0
                : Math.round(
                    (importedCount / rows.length) * 100
                );

        console.log("Saving history...");
        historyService.save(
            fileId,
            rows.length,
            importedCount,
            skipped.length
        );

        const summary = {
            total: rows.length,
            imported: importedCount,
            skipped: skipped.length,
            successRate,
        };

        return summary;
    }
}

export const importService = new ImportService();