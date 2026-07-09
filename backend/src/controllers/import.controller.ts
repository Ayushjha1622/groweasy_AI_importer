import { Request, Response, NextFunction } from "express";

import { importSchema } from "../validators/import.schema";

import { importService } from "../services/import.service";

import { successResponse } from "../utils/apiResponse";

export async function importController(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const { fileId } =
            importSchema.parse(req.body);

        const result =
            await importService.importCSV(fileId);

        return res.json(

            successResponse(
                result,
                "Import completed successfully."
            )

        );

    } catch (error) {

        next(error);

    }

}