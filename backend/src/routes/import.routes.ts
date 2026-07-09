import { Router } from "express";

import { importController } from "../controllers/import.controller";

const router = Router();

router.post("/", importController);

export default router;