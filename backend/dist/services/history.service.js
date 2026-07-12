"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyService = void 0;
const crypto_1 = require("crypto");
const history = [];
class HistoryService {
    save(fileName, total, imported, skipped) {
        console.log("Saving history...");
        history.unshift({
            id: (0, crypto_1.randomUUID)(),
            fileName,
            total,
            imported,
            skipped,
            successRate: total === 0
                ? 0
                : Math.round((imported / total) * 100),
            createdAt: new Date().toISOString()
        });
        console.log(history);
    }
    getAll() {
        console.log("Returning history");
        console.log(history);
        return history;
    }
}
exports.historyService = new HistoryService();
//# sourceMappingURL=history.service.js.map