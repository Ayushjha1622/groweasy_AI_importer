"use client";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { CRM_FIELDS } from "@/types/crmFields";

interface Props {
  value: string;
  onChange(value: string | null): void;
}

export default function FieldSelect({
  value,
  onChange,
}: Props) {
  return (
   <Select
  value={value}
  onValueChange={(value) => onChange(value)}
>
      <SelectTrigger className="w-[250px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>

       {CRM_FIELDS.map((field: string) => (
  <SelectItem
    key={field}
    value={field}
  >
    {field}
  </SelectItem>
))}
      </SelectContent>

    </Select>
  );
}