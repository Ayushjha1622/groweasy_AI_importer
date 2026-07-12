"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractJsonArray = extractJsonArray;
function extractJsonArray(text) {
    const first = text.indexOf("[");
    if (first === -1) {
        throw new Error("JSON array not found.");
    }
    let depth = 0;
    for (let i = first; i < text.length; i++) {
        if (text[i] === "[")
            depth++;
        if (text[i] === "]")
            depth--;
        if (depth === 0) {
            return text.substring(first, i + 1);
        }
    }
    throw new Error("Incomplete JSON array.");
}
//# sourceMappingURL=jsonExtractor.js.map