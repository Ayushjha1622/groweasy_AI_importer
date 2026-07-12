"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamCSVInBatches = streamCSVInBatches;
const fs_1 = __importDefault(require("fs"));
const parse_1 = require("@fast-csv/parse");
async function streamCSVInBatches(filePath, batchSize, onBatch) {
    return new Promise((resolve, reject) => {
        let totalRows = 0;
        let batch = [];
        const stream = fs_1.default
            .createReadStream(filePath)
            .pipe((0, parse_1.parse)({
            headers: true,
            ignoreEmpty: true,
            trim: true,
        }));
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
                }
                catch (err) {
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
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
//# sourceMappingURL=streamParser.service.js.map