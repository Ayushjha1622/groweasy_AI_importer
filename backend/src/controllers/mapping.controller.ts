import { Request, Response, NextFunction } from "express";

import { mappingService } from "../services/mapping/mapping.service";

export async function getMapping(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

    const fileId = Array.isArray(req.params.fileId)
    ? req.params.fileId[0]
    : req.params.fileId;

const mappings = await mappingService.getMappings(fileId);
     res.json({
    success: true,
    data: {

        fileId: req.params.fileId,

        totalColumns: mappings.length,

        mapped: mappings.filter(
            m => m.mappedField
        ).length,

        needsReview: mappings.filter(
            m => m.confidence < 90
        ).length,

        mappings,

    },
});
    } catch (error) {

        next(error);

    }

}