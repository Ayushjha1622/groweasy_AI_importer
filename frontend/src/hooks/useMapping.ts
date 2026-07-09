"use client";

import { useQuery } from "@tanstack/react-query";
import { getMappings } from "@/services/mapping.service";

export function useMappings(fileId: string) {
  return useQuery({
    queryKey: ["mapping", fileId],
    queryFn: () => getMappings(fileId),
    enabled: !!fileId,
  });
}