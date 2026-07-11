"use client";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from "recharts";

interface Props {
    imported: number;
    skipped: number;
}

export default function SuccessRatePieChart({ imported, skipped }: Props) {
    const data = [
        { name: "Successful", value: imported, color: "var(--color-emerald-500, #10b981)" },
        { name: "Failed", value: skipped, color: "var(--color-rose-500, #f43f5e)" }
    ];

    return (
        <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Success Rate</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
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
                        <Legend 
                            verticalAlign="bottom" 
                            height={36} 
                            iconType="circle"
                            formatter={(value) => <span className="text-sm font-medium text-muted-foreground">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
