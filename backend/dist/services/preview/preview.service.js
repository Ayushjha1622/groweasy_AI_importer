"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const AppError_1 = require("../../utils/AppError");
const csvParser_service_1 = require("../csv/csvParser.service");
const statistics_service_1 = require("./statistics.service");
class PreviewService {
    async getPreview(fileId) {
        const filePath = path_1.default.join(process.cwd(), "src", "uploads", fileId);
        if (!fs_1.default.existsSync(filePath)) {
            throw new AppError_1.AppError("File not found.", 404);
        }
        const rows = await (0, csvParser_service_1.parseCSV)(filePath);
        const headers = rows.length > 0
            ? Object.keys(rows[0])
            : [];
        return {
            fileName: fileId,
            totalRows: rows.length,
            totalColumns: headers.length,
            duplicateRows: (0, statistics_service_1.countDuplicateRows)(rows),
            missingValues: (0, statistics_service_1.countMissingValues)(rows),
            headers,
            preview: rows.slice(0, 20)
        };
    }
}
exports.previewService = new PreviewService();
//# sourceMappingURL=preview.service.js.map