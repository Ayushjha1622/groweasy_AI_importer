import { Router } from "express";

import uploadRoutes from "./upload.routes";
import importRoutes from "./import.routes";
import previewRoutes from "./preview.routes";
import mappingRoutes from "./mapping.routes";
import historyRoutes from "./history.routes";
import dashboardRoutes from "./dashboard.routes";

const router = Router();

router.use("/dashboard", dashboardRoutes);

router.use("/upload", uploadRoutes);

router.use("/preview", previewRoutes);

router.use("/mapping", mappingRoutes);

router.use("/import", importRoutes);

router.use("/history", historyRoutes);

export default router;