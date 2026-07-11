import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/apiResponse";

import { historyService } from "../services/history.service";

export const getHistory = asyncHandler(

    async (
        req: Request,
        res: Response
    ) => {

        const history =
            historyService.getAll();

        res.status(200).json(

            successResponse(

                history,

                "History fetched successfully."

            )

        );

    }

);