import fs from "fs";
import path from "path";

import { parseCSV } from "./csv/csvParser.service";

import { mapRow } from "./mapping/ruleMapper";
import { needsAI } from "./mapping/needAI";

import { mistralService } from "./ai/mistral.service";
import { createBatches } from "./ai/batchProcessor";

import { historyService } from "./history.service";

class ImportService {
    async process(fileId: string) {

        const filePath = path.join(
            process.cwd(),
            "src",
            "uploads",
            fileId
        );

        if (!fs.existsSync(filePath)) {
            throw new Error("Uploaded file not found.");
        }

        const rows = await parseCSV(filePath);

        const batches = createBatches(rows, 100);

        const imported: any[] = [];
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
            }

            let aiIndex = 0;

            mappedRecords.forEach((record) => {

                try {

                    if (needsAI(record)) {
                        imported.push(
                            aiRecords[aiIndex++]
                        );
                    } else {
                        imported.push(record);
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
                      (imported.length / rows.length) * 100
                  );

        console.log("Saving history...");
historyService.save(
    fileId,
    rows.length,
    imported.length,
    skipped.length
);

const summary = {
    total: rows.length,
    imported: imported.length,
    skipped: skipped.length,
    successRate,
    importedRecords: imported,
    skippedRecords: skipped,
};

return summary;
    }
}

export const importService = new ImportService();