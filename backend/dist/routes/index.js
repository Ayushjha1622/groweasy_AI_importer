"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_routes_1 = __importDefault(require("./upload.routes"));
const import_routes_1 = __importDefault(require("./import.routes"));
const preview_routes_1 = __importDefault(require("./preview.routes"));
const mapping_routes_1 = __importDefault(require("./mapping.routes"));
const history_routes_1 = __importDefault(require("./history.routes"));
const dashboard_routes_1 = __importDefault(require("./dashboard.routes"));
const router = (0, express_1.Router)();
router.use("/dashboard", dashboard_routes_1.default);
router.use("/upload", upload_routes_1.default);
router.use("/preview", preview_routes_1.default);
router.use("/mapping", mapping_routes_1.default);
router.use("/import", import_routes_1.default);
router.use("/history", history_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map