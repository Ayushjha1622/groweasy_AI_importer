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
import ImportsChart from "@/components/dashboard/ImportsChart";
import SuccessRatePieChart from "@/components/dashboard/SuccessRatePieChart";
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";

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
                    <Link href="/dashboard/upload">
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
                            color="text-blue-600 dark:text-blue-400"
                            bg="bg-blue-50 dark:bg-blue-900/30"
                        />

                        <StatsCard
                            title="Records Imported"
                            value={data.totalImported}
                            icon={CheckCircle2}
                            color="text-green-600 dark:text-green-400"
                            bg="bg-green-50 dark:bg-green-900/30"
                        />

                        <StatsCard
                            title="Failed Records"
                            value={data.failedImports}
                            icon={XCircle}
                            color="text-red-600 dark:text-red-400"
                            bg="bg-red-50 dark:bg-red-900/30"
                        />

                        <StatsCard
                            title="Average Success"
                            value={`${data.averageSuccessRate}%`}
                            icon={TrendingUp}
                            color="text-purple-600 dark:text-purple-400"
                            bg="bg-purple-50 dark:bg-purple-900/30"
                        />

                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="md:col-span-2 lg:col-span-2">
                            <ImportsChart data={data.recentImports.map(i => ({ fileName: i.fileName, imported: i.imported })).reverse()} />
                        </div>
                        <div>
                            <SuccessRatePieChart imported={data.totalImported} skipped={data.failedImports} />
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="md:col-span-1">
                            <RecentActivityCard activities={data.recentImports.slice(0, 5)} />
                        </div>
                        <div className="md:col-span-2">
                            <div className="rounded-xl border bg-card p-6 shadow-sm h-full">
                                <h2 className="mb-5 text-xl font-semibold">
                                    Recent Imports
                                </h2>
                                <HistoryTable
                                    rows={data.recentImports}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>

    );

}
