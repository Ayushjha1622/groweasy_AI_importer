"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function requireEnv(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}
exports.env = {
    PORT: Number(process.env.PORT) || 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
    MISTRAL_API_KEY: requireEnv("MISTRAL_API_KEY"),
    MISTRAL_MODEL: process.env.MISTRAL_MODEL || "mistral-small-latest",
    MAX_BATCH_SIZE: Number(process.env.MAX_BATCH_SIZE) || 25,
    MAX_FILE_SIZE: Number(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024
};
//# sourceMappingURL=env.js.map