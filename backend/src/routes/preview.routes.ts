import { Router } from "express";

import {
    previewController
} from "../controllers/preview.controller";

const router = Router();

router.get(
    "/:fileId",
    previewController
);

export default router;