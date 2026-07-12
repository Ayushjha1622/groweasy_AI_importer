"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDirectory = void 0;
exports.ensureUploadDirectory = ensureUploadDirectory;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.uploadDirectory = path_1.default.join(process.cwd(), "src", "uploads");
function ensureUploadDirectory() {
    if (!fs_1.default.existsSync(exports.uploadDirectory)) {
        fs_1.default.mkdirSync(exports.uploadDirectory, {
            recursive: true
        });
    }
}
//# sourceMappingURL=file.util.js.map