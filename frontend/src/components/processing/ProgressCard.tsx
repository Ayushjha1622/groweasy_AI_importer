"use client";

import { Progress } from "@/components/ui/progress";

interface Props {
    value: number;
}

export default function ProgressCard({
    value,
}: Props) {

    let statusText = "Uploading...";
    if (value > 10 && value <= 40) statusText = "Reading CSV...";
    else if (value > 40 && value <= 80) statusText = "AI Mapping...";
    else if (value > 80 && value < 100) statusText = "Saving...";
    else if (value === 100) statusText = "Completed";

    return (

        <div className="rounded-xl border p-6">

            <div className="mb-3 flex justify-between font-medium">

                <span>{statusText}</span>

                <span>{value}%</span>

            </div>

            <Progress value={value} />

        </div>

    );

}