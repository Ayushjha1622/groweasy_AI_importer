"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.needsAI = needsAI;
function needsAI(record) {
    return (!record.name ||
        !record.email ||
        !record.mobile_without_country_code ||
        !record.company ||
        !record.city ||
        !record.state ||
        !record.country ||
        !record.crm_status ||
        !record.data_source);
}
//# sourceMappingURL=needAI.js.map