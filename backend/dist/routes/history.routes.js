"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const history_controller_1 = require("../controllers/history.controller");
const router = (0, express_1.Router)();
router.get("/", history_controller_1.getHistory);
exports.default = router;
//# sourceMappingURL=history.routes.js.map