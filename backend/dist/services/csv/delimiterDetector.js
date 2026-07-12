"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectDelimiter = detectDelimiter;
const fs_1 = __importDefault(require("fs"));
function detectDelimiter(filePath) {
    const firstLine = fs_1.default
        .readFileSync(filePath, "utf8")
        .split("\n")[0];
    const delimiters = [",", ";", "\t", "|"];
    let winner = ",";
    let max = 0;
    for (const delimiter of delimiters) {
        const count = firstLine.split(delimiter).length;
        if (count > max) {
            max = count;
            winner = delimiter;
        }
    }
    return winner;
}
//# sourceMappingURL=delimiterDetector.js.map