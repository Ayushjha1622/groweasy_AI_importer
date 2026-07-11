"use client";

import PreviewHeader from "@/components/preview/PreviewHeader";
import MetricsGrid from "@/components/preview/MetricGrid";
import PreviewTable from "@/components/preview/PreviewTable";
import PreviewActions from "@/components/preview/PreviewActions";
import { Skeleton } from "@/components/ui/skeleton";

import { usePreview } from "@/hooks/usePreview";
import { useUploadStore } from "@/store/upload.store";

export default function PreviewPage() {

    const fileId = useUploadStore(
        (state) => state.fileId
    );

    const { data, isLoading, error } =
        usePreview(fileId);

    if (!fileId) {
        return (
            <p>No uploaded file found.</p>
        );
    }

    if (isLoading) {
        return (
            <div className="space-y-8">
                <Skeleton className="h-20 w-full rounded-xl" />
                <div className="grid gap-6 md:grid-cols-4">
                    <Skeleton className="h-28 rounded-xl" />
                    <Skeleton className="h-28 rounded-xl" />
                    <Skeleton className="h-28 rounded-xl" />
                    <Skeleton className="h-28 rounded-xl" />
                </div>
                <Skeleton className="h-[400px] w-full rounded-xl" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <p>Unable to load preview.</p>
        );
    }

    return (

        <div className="space-y-8">

            <PreviewHeader
                fileName={data.data.fileName}
            />

            <MetricsGrid
                data={data.data}
            />

            <PreviewTable
                headers={data.data.headers}
                rows={data.data.preview}
            />

            <PreviewActions />

        </div>

    );

}