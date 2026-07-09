import { Card } from "@/components/ui/card";

interface Props {
    title: string;
    value: number;
}

export default function StatsCard({
    title,
    value,
}: Props) {
    return (
        <Card className="rounded-2xl p-6">

            <p className="text-sm text-muted-foreground">
                {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
                {value}
            </h2>

        </Card>
    );
}