import path from "path";

import { UploadMetadata } from "../types/upload.types";
import { uploadFileSchema } from "../validators/upload.schema";
import { AppError } from "../utils/AppError";

export class UploadService {

    upload(file: Express.Multer.File): UploadMetadata {

        if (!file) {
            throw new AppError("CSV file is required.", 400);
        }

        uploadFileSchema.parse(file);

        return {
            fileId: file.filename,

            fileName: file.filename,

            originalName: file.originalname,

            mimeType: file.mimetype,

            extension: path.extname(file.originalname),

            size: file.size,

            path: file.path
        };
    }

}

export const uploadService = new UploadService();