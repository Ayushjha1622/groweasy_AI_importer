"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const preview_controller_1 = require("../controllers/preview.controller");
const router = (0, express_1.Router)();
router.get("/:fileId", preview_controller_1.previewController);
exports.default = router;
//# sourceMappingURL=preview.routes.js.map