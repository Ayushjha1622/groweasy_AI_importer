import { Request, Response } from "express";
import { successResponse } from "../utils/apiResponse";
import { env } from "../config/env";

export function healthController(req: Request, res: Response) {
    return res.json(
        successResponse({
            environment: env.NODE_ENV,
            timestamp: new Date()
        }, "GrowEasy AI Importer API is running.")
    );
}