"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importSchema = void 0;
const zod_1 = require("zod");
exports.importSchema = zod_1.z.object({
    fileId: zod_1.z.string().min(1)
});
//# sourceMappingURL=import.schema.js.map