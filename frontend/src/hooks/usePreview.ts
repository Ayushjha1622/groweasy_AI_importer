"use client";

import { useQuery } from "@tanstack/react-query";
import { getPreview } from "@/services/preview.service";

export function usePreview(fileId: string) {
    return useQuery({
        queryKey: ["preview", fileId],
        queryFn: () => getPreview(fileId),
        enabled: !!fileId,
    });
}