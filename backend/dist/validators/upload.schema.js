"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileSchema = void 0;
const zod_1 = require("zod");
exports.uploadFileSchema = zod_1.z.object({
    originalname: zod_1.z
        .string()
        .min(1, "Original filename is required"),
    filename: zod_1.z
        .string()
        .min(1, "Stored filename is required"),
    mimetype: zod_1.z
        .string(),
    size: zod_1.z
        .number()
        .positive()
});
//# sourceMappingURL=upload.schema.js.map