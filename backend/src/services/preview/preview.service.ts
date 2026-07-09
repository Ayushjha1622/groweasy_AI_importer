import fs from "fs";
import path from "path";

import { AppError } from "../../utils/AppError";

import { parseCSV } from "../csv/csvParser.service";

import {
    countDuplicateRows,
    countMissingValues
} from "./statistics.service";

import { PreviewResponse } from "../../types/preview.types";

class PreviewService {

    async getPreview(
        fileId: string
    ): Promise<PreviewResponse> {

        const filePath = path.join(
            process.cwd(),
            "src",
            "uploads",
            fileId
        );

        if (!fs.existsSync(filePath)) {
            throw new AppError(
                "File not found.",
                404
            );
        }

        const rows = await parseCSV(filePath);

        const headers =
            rows.length > 0
                ? Object.keys(rows[0])
                : [];

        return {

            fileName: fileId,

            totalRows: rows.length,

            totalColumns: headers.length,

            duplicateRows:
                countDuplicateRows(rows),

            missingValues:
                countMissingValues(rows),

            headers,

            preview:
                rows.slice(0, 20)

        };

    }

}

export const previewService =
    new PreviewService();