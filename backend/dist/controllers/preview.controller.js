"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewController = previewController;
const preview_service_1 = require("../services/preview/preview.service");
async function previewController(req, res) {
    const result = await preview_service_1.previewService.getPreview(req.params.fileId);
    return res.json({
        success: true,
        data: result,
    });
}
//# sourceMappingURL=preview.controller.js.map