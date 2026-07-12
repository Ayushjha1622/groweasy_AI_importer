"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBatches = createBatches;
function createBatches(records, size = 10) {
    const batches = [];
    for (let i = 0; i < records.length; i += size) {
        batches.push(records.slice(i, i + size));
    }
    return batches;
}
//# sourceMappingURL=batchProcessor.js.map