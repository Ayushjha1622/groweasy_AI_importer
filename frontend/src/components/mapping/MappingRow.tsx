"use client";

import { ColumnMapping } from "@/types/mapping";

import FieldSelect from "./FieldSelect";
import ConfidenceBadge from "./ConfidenceBadge";

interface Props {
  mapping: ColumnMapping;
  onChange(field: string): void;
}

export default function MappingRow({
  mapping,
  onChange,
}: Props) {
  return (
    <tr className="border-b">

      <td className="p-4 font-medium">
        {mapping.csvColumn}
      </td>

      <td className="p-4">
        <FieldSelect
          value={mapping.mappedField}
          onChange={onChange}
        />
      </td>

      <td className="p-4">
        <ConfidenceBadge
          confidence={mapping.confidence}
        />
      </td>

    </tr>
  );
}