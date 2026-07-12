"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCSV = parseCSV;
const fs_1 = __importDefault(require("fs"));
const parse_1 = require("@fast-csv/parse");
const headerNormalizer_1 = require("./headerNormalizer");
const delimiterDetector_1 = require("./delimiterDetector");
async function parseCSV(filePath) {
    const rows = [];
    const delimiter = (0, delimiterDetector_1.detectDelimiter)(filePath);
    return new Promise((resolve, reject) => {
        fs_1.default.createReadStream(filePath)
            .pipe((0, parse_1.parse)({
            headers: (headers) => headers.map(h => h ? (0, headerNormalizer_1.normalizeHeader)(h) : ""),
            delimiter,
            ignoreEmpty: true,
            trim: true,
        }))
            .on("error", reject)
            .on("data", (row) => {
            rows.push(row);
        })
            .on("end", () => {
            resolve(rows);
        });
    });
}
//# sourceMappingURL=csvParser.service.js.map