"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.needHeaderAI = needHeaderAI;
function needHeaderAI(mappings) {
    return mappings.filter(mapping => !mapping.mappedField ||
        mapping.confidence < 90);
}
//# sourceMappingURL=needHeader.js.map