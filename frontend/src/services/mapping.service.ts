import { api } from "@/lib/axios";

import { MappingResponse } from "@/types/mapping";

export async function getMappings(
    fileId: string
): Promise<MappingResponse> {

    const { data } = await api.get(
        `/mapping/${fileId}`
    );

    return data.data;

}