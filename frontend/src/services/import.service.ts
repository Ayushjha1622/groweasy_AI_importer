import { api } from "@/lib/axios";
import { ImportSummary } from "@/types/import";

export async function processImport(
    fileId: string
): Promise<ImportSummary> {

    const { data } = await api.post(
        "/import",
        {
            fileId,
        }
    );

    return data.data;
}