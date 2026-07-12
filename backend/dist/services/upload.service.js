"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadService = exports.UploadService = void 0;
const path_1 = __importDefault(require("path"));
const upload_schema_1 = require("../validators/upload.schema");
const AppError_1 = require("../utils/AppError");
class UploadService {
    upload(file) {
        if (!file) {
            throw new AppError_1.AppError("CSV file is required.", 400);
        }
        upload_schema_1.uploadFileSchema.parse(file);
        return {
            fileId: file.filename,
            fileName: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            extension: path_1.default.extname(file.originalname),
            size: file.size,
            path: file.path
        };
    }
}
exports.UploadService = UploadService;
exports.uploadService = new UploadService();
//# sourceMappingURL=upload.service.js.map