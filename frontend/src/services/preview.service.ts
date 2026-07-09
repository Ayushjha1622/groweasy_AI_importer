import { api } from "@/lib/axios";
import { PreviewResponse } from "@/types/preview";

export async function getPreview(fileId: string) {
    const { data } = await api.get<PreviewResponse>(
        `/preview/${fileId}`
    );

    return data;
}