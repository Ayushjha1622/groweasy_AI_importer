import { api } from "@/lib/axios";

export interface DashboardStats {

    totalImports: number;

    totalImported: number;

    failedImports: number;

    averageSuccessRate: number;

    recentImports: any[];

}

export async function getDashboardStats(): Promise<DashboardStats> {

    const { data } = await api.get(
        "/dashboard"
    );

    return data.data;

}
