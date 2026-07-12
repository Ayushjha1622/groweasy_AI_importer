import multer from "multer";
import path from "path";

import { AppError } from "../utils/AppError";
import { env } from "../config/env";
import { ensureUploadDirectory, uploadDirectory } from "../utils/file.util";
import { ALLOWED_FILE_TYPES, CSV_EXTENSION } from "../constants/upload.constants";

ensureUploadDirectory();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        ensureUploadDirectory();
        cb(null, uploadDirectory);
    },

    filename(req, file, cb) {
        const extension = path.extname(file.originalname);
        const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}${extension}`;

        cb(null, filename);
    }
});

const fileFilter: multer.Options["fileFilter"] = (
    req,
    file,
    cb
) => {
    const extension = path.extname(file.originalname).toLowerCase();

    if (
        !ALLOWED_FILE_TYPES.includes(file.mimetype) &&
        extension !== CSV_EXTENSION
    ) {
        return cb(new AppError("Only CSV files are allowed.", 400));
    }

    cb(null, true);
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: env.MAX_FILE_SIZE
    }
});