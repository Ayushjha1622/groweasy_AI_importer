"use client";

import {
    Database,
    CheckCircle2,
    TrendingUp,
    XCircle,
} from "lucide-react";

import { useDashboard } from "@/hooks/useDashboard";

import StatsCard from "@/components/dashboard/StatsCard";
import HistoryTable from "@/components/history/HistoryTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {

    const {
        data,
        isLoading,
    } = useDashboard();

    if (isLoading) {
        return (
            <div className="space-y-8">
                <Skeleton className="h-20 w-1/3 rounded-xl" />
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    <Skeleton className="h-32 rounded-xl" />
                    <Skeleton className="h-32 rounded-xl" />
                    <Skeleton className="h-32 rounded-xl" />
                    <Skeleton className="h-32 rounded-xl" />
                </div>
                <Skeleton className="h-[400px] w-full rounded-xl" />
            </div>
        );
    }

    if (!data) {
        return <p>No dashboard data.</p>;
    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">
                    Dashboard
                </h1>

                <p className="text-muted-foreground">
                    Overview of all imports.
                </p>

            </div>

            {data.totalImports === 0 ? (
                <div className="rounded-xl border py-20 text-center flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-semibold mb-2">No imports yet.</h2>
                    <p className="text-muted-foreground mb-6">Upload your first CSV.</p>
                    <Link href="/upload">
                        <Button className="bg-black text-white hover:bg-neutral-800">
                            Go to Upload
                        </Button>
                    </Link>
                </div>
            ) : (
                <>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                        <StatsCard
                            title="Total Imports"
                            value={data.totalImports}
                            icon={Database}
                            color="text-blue-600"
                            bg="bg-blue-50"
                        />

                        <StatsCard
                            title="Records Imported"
                            value={data.totalImported}
                            icon={CheckCircle2}
                            color="text-green-600"
                            bg="bg-green-50"
                        />

                        <StatsCard
                            title="Failed Records"
                            value={data.failedImports}
                            icon={XCircle}
                            color="text-red-600"
                            bg="bg-red-50"
                        />

                        <StatsCard
                            title="Average Success"
                            value={`${data.averageSuccessRate}%`}
                            icon={TrendingUp}
                            color="text-purple-600"
                            bg="bg-purple-50"
                        />

                    </div>

                    <div>

                        <h2 className="mb-5 text-2xl font-semibold">
                            Recent Imports
                        </h2>

                        <HistoryTable
                            rows={data.recentImports}
                        />

                    </div>
                </>
            )}

        </div>

    );

}
