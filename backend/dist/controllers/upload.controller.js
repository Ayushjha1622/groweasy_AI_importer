"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadController = void 0;
const upload_service_1 = require("../services/upload.service");
const apiResponse_1 = require("../utils/apiResponse");
const uploadController = async (req, res, next) => {
    try {
        const result = upload_service_1.uploadService.upload(req.file);
        return res.status(200).json((0, apiResponse_1.successResponse)(result, "File uploaded successfully."));
    }
    catch (error) {
        next(error);
    }
};
exports.uploadController = uploadController;
//# sourceMappingURL=upload.controller.js.map