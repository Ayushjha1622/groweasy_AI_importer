import { z } from "zod";

export const importSchema = z.object({
    fileId: z.string().min(1)
});

export type ImportDTO = z.infer<typeof importSchema>;