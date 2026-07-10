import { Router } from "express";

import {
    processImport,
} from "../controllers/import.controller";

const router = Router();

router.post(
    "/",
    processImport
);

export default router;