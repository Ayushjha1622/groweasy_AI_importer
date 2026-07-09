import { z } from "zod";

export const uploadFileSchema = z.object({

    originalname: z
        .string()
        .min(1, "Original filename is required"),

    filename: z
        .string()
        .min(1, "Stored filename is required"),

    mimetype: z
        .string(),

    size: z
        .number()
        .positive()

});

export type UploadFileDTO = z.infer<typeof uploadFileSchema>;