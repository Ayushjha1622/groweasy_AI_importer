"use client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

interface Props {
    data: {
        fileName: string;
        imported: number;
    }[];
}

export default function ImportsChart({ data }: Props) {
    // If we only have 1 data point, duplicate it so the line chart shows something
    const chartData = data.length === 1 ? [data[0], data[0]] : data;

    return (
        <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Import Trend</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <XAxis 
                            dataKey="fileName" 
                            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} 
                            tickLine={false} 
                            axisLine={false} 
                        />
                        <YAxis 
                            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} 
                            tickLine={false} 
                            axisLine={false} 
                        />
                        <Tooltip 
                            contentStyle={{ 
                                borderRadius: '8px', 
                                border: '1px solid var(--border)', 
                                backgroundColor: 'var(--card)',
                                color: 'var(--foreground)',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                            }}
                            itemStyle={{ color: 'var(--foreground)' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="imported"
                            stroke="var(--primary)"
                            strokeWidth={3}
                            dot={{ r: 4, fill: 'var(--primary)', stroke: 'var(--card)', strokeWidth: 2 }}
                            activeDot={{ r: 6, fill: 'var(--primary)', stroke: 'var(--card)', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
