"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistory = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const apiResponse_1 = require("../utils/apiResponse");
const history_service_1 = require("../services/history.service");
exports.getHistory = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const history = history_service_1.historyService.getAll();
    res.status(200).json((0, apiResponse_1.successResponse)(history, "History fetched successfully."));
});
//# sourceMappingURL=history.controller.js.map