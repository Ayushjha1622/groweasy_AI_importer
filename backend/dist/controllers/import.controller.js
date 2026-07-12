"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImport = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const apiResponse_1 = require("../utils/apiResponse");
const import_service_1 = require("../services/import.service");
exports.processImport = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { fileId } = req.body;
    console.log("Controller started");
    const result = await import_service_1.importService.process(fileId);
    console.log("Controller finished");
    res.status(200).json((0, apiResponse_1.successResponse)(result, "Import completed."));
});
//# sourceMappingURL=import.controller.js.map