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
        { name: "Successful", value: imported, color: "#a855f7" },
        { name: "Failed", value: skipped, color: "#f43f5e" }
    ];

    return (
        <div className="glass-panel p-6 rounded-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.05)] transition-all duration-500">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Success Rate</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: `drop-shadow(0px 0px 8px ${entry.color}80)` }} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ 
                                borderRadius: '12px', 
                                border: '1px solid rgba(255,255,255,0.1)', 
                                backgroundColor: 'rgba(20, 20, 25, 0.8)',
                                backdropFilter: 'blur(10px)',
                                color: 'var(--foreground)',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' 
                            }}
                            itemStyle={{ fontWeight: 'bold' }}
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
