import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/apiResponse";
import { historyService } from "../services/history.service";

export const getDashboardStats = asyncHandler(

    async (_req: Request, res: Response) => {

        const history = historyService.getAll();

        const totalImports = history.length;

        const totalImported = history.reduce(
            (sum, item) => sum + item.imported,
            0
        );

        const failedImports = history.reduce(
            (sum, item) => sum + item.skipped,
            0
        );

        const averageSuccessRate =
            totalImports === 0
                ? 0
                : Math.round(
                      history.reduce(
                          (sum, item) =>
                              sum + item.successRate,
                          0
                      ) / totalImports
                  );

        res.json(
            successResponse(
                {
                    totalImports,
                    totalImported,
                    failedImports,
                    averageSuccessRate,
                    recentImports: history.slice(0, 5),
                },
                "Dashboard statistics fetched."
            )
        );
    }

);
