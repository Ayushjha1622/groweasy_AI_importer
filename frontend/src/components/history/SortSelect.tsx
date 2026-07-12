"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
    value: string;
    onChange(value: string): void;
}

export default function SortSelect({
    value,
    onChange,
}: Props) {
    return (
        <Select
            value={value}
            onValueChange={(val) => {
                if (val !== null && val !== undefined) {
                    onChange(val);
                }
            }}
        >
            <SelectTrigger className="w-52">
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="newest">
                    Newest First
                </SelectItem>

                <SelectItem value="oldest">
                    Oldest First
                </SelectItem>
            </SelectContent>
        </Select>
    );
}