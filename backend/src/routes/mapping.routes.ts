import { Router } from "express";

import { getMapping } from "../controllers/mapping.controller";

const router = Router();

router.get("/:fileId", getMapping);

export default router;