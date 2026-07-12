"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMapping = getMapping;
const mapping_service_1 = require("../services/mapping/mapping.service");
async function getMapping(req, res, next) {
    try {
        const fileId = Array.isArray(req.params.fileId)
            ? req.params.fileId[0]
            : req.params.fileId;
        const mappings = await mapping_service_1.mappingService.getMappings(fileId);
        res.json({
            success: true,
            data: {
                fileId: req.params.fileId,
                totalColumns: mappings.length,
                mapped: mappings.filter(m => m.mappedField).length,
                needsReview: mappings.filter(m => m.confidence < 90).length,
                mappings,
            },
        });
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=mapping.controller.js.map