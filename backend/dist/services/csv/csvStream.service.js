"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamCSV = streamCSV;
const fs_1 = __importDefault(require("fs"));
const parse_1 = require("@fast-csv/parse");
async function streamCSV(filePath) {
    return new Promise((resolve, reject) => {
        const rows = [];
        fs_1.default.createReadStream(filePath)
            .pipe((0, parse_1.parse)({ headers: true, ignoreEmpty: true, trim: true }))
            .on("data", (row) => {
            rows.push(row);
        })
            .on("end", () => {
            resolve(rows);
        })
            .on("error", reject);
    });
}
//# sourceMappingURL=csvStream.service.js.map