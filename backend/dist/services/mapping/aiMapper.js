"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiMapper = aiMapper;
const mistral_service_1 = require("../ai/mistral.service");
async function aiMapper(headers) {
    if (headers.length === 0) {
        return [];
    }
    return await mistral_service_1.mistralService.mapHeaders(headers);
}
//# sourceMappingURL=aiMapper.js.map