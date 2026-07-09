import { Request, Response } from "express";
import { previewService } from "../services/preview/preview.service";

interface PreviewParams {
    fileId: string;
}

export async function previewController(
    req: Request<PreviewParams>,
    res: Response
) {
    const result = await previewService.getPreview(req.params.fileId);

    return res.json({
        success: true,
        data: result,
    });
}