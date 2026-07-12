"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfidence = getConfidence;
function getConfidence(csvColumn, mappedField) {
    if (!mappedField) {
        return 0;
    }
    const csv = csvColumn
        .replace(/[\s_-]/g, "")
        .toLowerCase();
    const crm = mappedField
        .replace(/[\s_-]/g, "")
        .toLowerCase();
    // Exact match
    if (csv === crm) {
        return 100;
    }
    // Partial match
    if (csv.includes(crm) ||
        crm.includes(csv)) {
        return 95;
    }
    // Alias match
    return 90;
}
//# sourceMappingURL=confidence.js.map