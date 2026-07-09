import { Router } from "express";

import uploadRoutes from "./upload.routes";
import importRoutes from "./import.routes";
import previewRoutes from "./preview.routes";
import healthRoutes from "./health.routes";
import mappingRoutes from "./mapping.routes";

const router = Router();

router.use("/health", healthRoutes);

router.use("/upload", uploadRoutes);

router.use("/import", importRoutes);

router.use("/preview", previewRoutes);

router.use("/mapping", mappingRoutes);

export default router;