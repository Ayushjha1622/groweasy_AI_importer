import { api } from "@/lib/axios";

export interface HistoryItem {

    id: string;

    fileName: string;

    total: number;

    imported: number;

    skipped: number;

    successRate: number;

    createdAt: string;

}

export async function getHistory(): Promise<HistoryItem[]> {

    const { data } = await api.get(
        "/history"
    );

    return data.data;

}