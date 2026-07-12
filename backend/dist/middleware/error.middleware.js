"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const AppError_1 = require("../utils/AppError");
function errorHandler(err, req, res, next) {
    console.error("========== ERROR ==========");
    console.error(err);
    console.error(err.stack);
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }
    return res.status(500).json({
        success: false,
        message: err.message
    });
}
//# sourceMappingURL=error.middleware.js.map