"use client";

import { useQuery } from "@tanstack/react-query";
import { getHistory } from "@/services/history.service";

export function useHistory() {
    return useQuery({
        queryKey: ["history"],
        queryFn: getHistory,
    });
}