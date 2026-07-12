import { Router } from "express";

import { testStream } from "../controllers/test.controller";

const router = Router();

router.get(
    "/stream/:fileName",
    testStream
);

export default router;