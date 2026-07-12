"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mapping_controller_1 = require("../controllers/mapping.controller");
const router = (0, express_1.Router)();
router.get("/:fileId", mapping_controller_1.getMapping);
exports.default = router;
//# sourceMappingURL=mapping.routes.js.map