"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const logger_1 = require("./config/logger");
logger_1.logger.info({
    keyLoaded: !!env_1.env.MISTRAL_API_KEY,
    keyPrefix: env_1.env.MISTRAL_API_KEY.substring(0, 8)
});
app_1.default.listen(env_1.env.PORT, () => {
    logger_1.logger.info(`🚀 Server running at http://localhost:${env_1.env.PORT}`);
});
//# sourceMappingURL=server.js.map