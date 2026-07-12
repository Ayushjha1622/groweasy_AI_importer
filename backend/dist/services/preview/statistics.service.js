"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countMissingValues = countMissingValues;
exports.countDuplicateRows = countDuplicateRows;
function countMissingValues(rows) {
    let missing = 0;
    rows.forEach(row => {
        Object.values(row).forEach(value => {
            if (value === undefined ||
                value === null ||
                value.toString().trim() === "") {
                missing++;
            }
        });
    });
    return missing;
}
function countDuplicateRows(rows) {
    const set = new Set();
    let duplicates = 0;
    rows.forEach(row => {
        const key = JSON.stringify(row);
        if (set.has(key)) {
            duplicates++;
        }
        else {
            set.add(key);
        }
    });
    return duplicates;
}
//# sourceMappingURL=statistics.service.js.map