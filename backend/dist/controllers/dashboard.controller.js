"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const apiResponse_1 = require("../utils/apiResponse");
const history_service_1 = require("../services/history.service");
exports.getDashboardStats = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const history = history_service_1.historyService.getAll();
    const totalImports = history.length;
    const totalImported = history.reduce((sum, item) => sum + item.imported, 0);
    const failedImports = history.reduce((sum, item) => sum + item.skipped, 0);
    const averageSuccessRate = totalImports === 0
        ? 0
        : Math.round(history.reduce((sum, item) => sum + item.successRate, 0) / totalImports);
    res.json((0, apiResponse_1.successResponse)({
        totalImports,
        totalImported,
        failedImports,
        averageSuccessRate,
        recentImports: history.slice(0, 5),
    }, "Dashboard statistics fetched."));
});
//# sourceMappingURL=dashboard.controller.js.map