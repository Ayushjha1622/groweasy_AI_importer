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
        <div className="glass-panel p-6 rounded-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.05)] transition-all duration-500">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Import Trend</h3>
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
                                borderRadius: '12px', 
                                border: '1px solid rgba(255,255,255,0.1)', 
                                backgroundColor: 'rgba(20, 20, 25, 0.8)',
                                backdropFilter: 'blur(10px)',
                                color: 'var(--foreground)',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' 
                            }}
                            itemStyle={{ color: 'var(--primary)', fontWeight: 'bold' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="imported"
                            stroke="var(--primary)"
                            strokeWidth={4}
                            filter="drop-shadow(0px 0px 8px rgba(168,85,247,0.8))"
                            dot={false}
                            activeDot={{ r: 6, fill: 'var(--primary)', stroke: 'white', strokeWidth: 2, filter: 'drop-shadow(0px 0px 8px rgba(168,85,247,1))' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
