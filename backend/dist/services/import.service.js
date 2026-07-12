"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csvStream_service_1 = require("./csv/csvStream.service");
const ruleMapper_1 = require("./mapping/ruleMapper");
const needAI_1 = require("./mapping/needAI");
const mistral_service_1 = require("./ai/mistral.service");
const batchProcessor_1 = require("./ai/batchProcessor");
const history_service_1 = require("./history.service");
class ImportService {
    async process(fileId) {
        console.log("Import Service Started");
        const filePath = path_1.default.join(process.cwd(), "src", "uploads", fileId);
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error("Uploaded file not found.");
        }
        console.time("CSV Streaming");
        const rows = await (0, csvStream_service_1.streamCSV)(filePath);
        console.timeEnd("CSV Streaming");
        console.log("Rows:", rows.length);
        const batches = (0, batchProcessor_1.createBatches)(rows, 50);
        let importedCount = 0;
        const skipped = [];
        for (const batch of batches) {
            const aiCandidates = [];
            const mappedRecords = batch.map((row) => {
                const crm = (0, ruleMapper_1.mapRow)(row);
                if ((0, needAI_1.needsAI)(crm)) {
                    aiCandidates.push(crm);
                }
                return crm;
            });
            let aiRecords = [];
            if (aiCandidates.length > 0) {
                console.log(`Sending ${aiCandidates.length} rows to AI`);
                aiRecords = await mistral_service_1.mistralService.extract(aiCandidates);
                // Cooldown between batches to avoid rate-limiting
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
            let aiIndex = 0;
            mappedRecords.forEach((record) => {
                try {
                    if ((0, needAI_1.needsAI)(record)) {
                        const aiRecord = aiRecords[aiIndex++];
                        if (aiRecord) {
                            importedCount++;
                        }
                    }
                    else {
                        importedCount++;
                    }
                }
                catch (error) {
                    skipped.push({
                        row: record,
                        reason: error instanceof Error
                            ? error.message
                            : "Unknown Error",
                    });
                }
            });
        }
        const successRate = rows.length === 0
            ? 0
            : Math.round((importedCount / rows.length) * 100);
        console.log("Saving history...");
        history_service_1.historyService.save(fileId, rows.length, importedCount, skipped.length);
        const summary = {
            total: rows.length,
            imported: importedCount,
            skipped: skipped.length,
            successRate,
        };
        return summary;
    }
}
exports.importService = new ImportService();
//# sourceMappingURL=import.service.js.map