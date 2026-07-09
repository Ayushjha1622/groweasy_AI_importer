import { api } from "@/lib/axios";

import { UploadResponse } from "@/types/upload";

export async function uploadCSV(file: File) {

    const formData = new FormData();

    formData.append("file", file);

    const { data } =
        await api.post<UploadResponse>(
            "/upload",
            formData
        );

    return data;

}