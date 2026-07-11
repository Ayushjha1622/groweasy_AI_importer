"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
    value: string;
    onChange(value: string): void;
}

export default function SearchBox({
    value,
    onChange,
}: Props) {

    return (

        <div className="relative w-full max-w-md">

            <Search
                className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
            />

            <Input
                value={value}
                placeholder="Search by filename..."
                className="pl-10"
                onChange={(e) =>
                    onChange(e.target.value)
                }
            />

        </div>

    );

}
