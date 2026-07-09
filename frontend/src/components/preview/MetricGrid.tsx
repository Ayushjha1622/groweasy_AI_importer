import MetricCard from "./MetricCard";
import { PreviewData } from "@/types/preview";

interface Props {
    data: PreviewData;
}

export default function StatsCards({
    data,
}: Props) {
    return (
        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

            <MetricCard
                title="Rows"
                value={data.totalRows}
            />

            <MetricCard
                title="Columns"
                value={data.totalColumns}
            />

            <MetricCard
                title="Duplicates"
                value={data.duplicateRows}
            />

            <MetricCard
                title="Missing Values"
                value={data.missingValues}
            />

        </div>
    );
}