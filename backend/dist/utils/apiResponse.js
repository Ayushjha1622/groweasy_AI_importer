"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = successResponse;
exports.errorResponse = errorResponse;
function successResponse(data, message = "Success") {
    return {
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    };
}
function errorResponse(message) {
    return {
        success: false,
        message,
        timestamp: new Date().toISOString()
    };
}
//# sourceMappingURL=apiResponse.js.map