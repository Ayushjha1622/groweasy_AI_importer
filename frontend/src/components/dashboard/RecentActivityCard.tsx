"use client";

import { FileSpreadsheet } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { HistoryItem } from "@/services/history.service";

interface Props {
    activities: HistoryItem[];
}

export default function RecentActivityCard({ activities }: Props) {
    return (
        <div className="rounded-xl border bg-card p-6 shadow-sm h-full max-h-[400px] flex flex-col">
            <h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>
            
            {activities.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                    No recent activity.
                </div>
            ) : (
                <div className="space-y-6 overflow-y-auto pr-2">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4">
                            <div className="mt-1 rounded-full bg-blue-50 dark:bg-blue-900/30 p-2 text-blue-600 dark:text-blue-400">
                                <FileSpreadsheet size={16} />
                            </div>
                            <div>
                                <p className="text-sm font-medium">
                                    Imported <span className="font-semibold">{activity.fileName}</span>
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
