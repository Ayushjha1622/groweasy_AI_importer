"use client";

import { Progress } from "@/components/ui/progress";

interface Props {
    value: number;
}

export default function ProgressCard({
    value,
}: Props) {

    return (

        <div className="rounded-xl border p-6">

            <div className="mb-3 flex justify-between">

                <span>Processing...</span>

                <span>{value}%</span>

            </div>

            <Progress value={value} />

        </div>

    );

}