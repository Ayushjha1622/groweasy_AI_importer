import { Request, Response, NextFunction } from "express";
import { uploadService } from "../services/upload.service";
import { successResponse } from "../utils/apiResponse";

export const uploadController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = uploadService.upload(req.file!);

        return res.status(200).json(
            successResponse(result, "File uploaded successfully.")
        );
    } catch (error) {
        next(error);
    }
};