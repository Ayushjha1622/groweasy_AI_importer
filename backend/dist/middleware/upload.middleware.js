"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const AppError_1 = require("../utils/AppError");
const env_1 = require("../config/env");
const file_util_1 = require("../utils/file.util");
const upload_constants_1 = require("../constants/upload.constants");
(0, file_util_1.ensureUploadDirectory)();
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        (0, file_util_1.ensureUploadDirectory)();
        cb(null, file_util_1.uploadDirectory);
    },
    filename(req, file, cb) {
        const extension = path_1.default.extname(file.originalname);
        const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}${extension}`;
        cb(null, filename);
    }
});
const fileFilter = (req, file, cb) => {
    const extension = path_1.default.extname(file.originalname).toLowerCase();
    if (!upload_constants_1.ALLOWED_FILE_TYPES.includes(file.mimetype) &&
        extension !== upload_constants_1.CSV_EXTENSION) {
        return cb(new AppError_1.AppError("Only CSV files are allowed.", 400));
    }
    cb(null, true);
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: env_1.env.MAX_FILE_SIZE
    }
});
//# sourceMappingURL=upload.middleware.js.map