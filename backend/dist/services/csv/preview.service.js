"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewCSV = previewCSV;
const csvParser_service_1 = require("./csvParser.service");
async function previewCSV(filePath) {
    const rows = await (0, csvParser_service_1.parseCSV)(filePath);
    return {
        totalRows: rows.length,
        headers: rows.length > 0
            ? Object.keys(rows[0])
            : [],
        preview: rows.slice(0, 10)
    };
}
//# sourceMappingURL=preview.service.js.map