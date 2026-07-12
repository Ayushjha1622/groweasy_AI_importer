"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_middleware_1 = require("../middleware/upload.middleware");
const upload_controller_1 = require("../controllers/upload.controller");
const router = (0, express_1.Router)();
router.post("/", upload_middleware_1.upload.single("file"), upload_controller_1.uploadController);
exports.default = router;
//# sourceMappingURL=upload.routes.js.map