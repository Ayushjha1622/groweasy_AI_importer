import { Request, Response } from "express";
import path from "path";

import { streamCSV } from "../services/csv/csvStream.service";

export async function testStream(
    req: Request,
    res: Response
) {

    try {

        const filePath = path.join(
            process.cwd(),
            "src",
            "uploads",
           String(req.params.fileName)
        );

        console.time("Stream CSV");

        const rows = await streamCSV(filePath);

        console.timeEnd("Stream CSV");

        res.json({

            success: true,

            totalRows: rows.length,

            firstRow: rows[0],

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Streaming failed",

        });

    }

}