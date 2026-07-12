import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";

import { successResponse } from "../utils/apiResponse";

import { importService } from "../services/import.service";

export const processImport =
    asyncHandler(

        async (
            req: Request,
            res: Response
        ) => {

            const { fileId } = req.body;

            console.log("Controller started");

            const result =
                await importService.process(
                    fileId
                );

            console.log("Controller finished");

            res.status(200).json(
                successResponse(
                    result,
                    "Import completed."
                )
            );

        }

    );