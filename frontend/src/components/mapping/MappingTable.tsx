"use client";

import { useState } from "react";

import { ColumnMapping } from "@/types/mapping";

import MappingRow from "./MappingRow";

interface Props {
  mappings: ColumnMapping[];
}

export default function MappingTable({
  mappings,
}: Props) {

  const [rows, setRows] = useState(mappings);

  function updateField(
    index: number,
    field: string
  ) {
    const copy = [...rows];

    copy[index] = {
      ...copy[index],
      mappedField: field,
    };

    setRows(copy);
  }

  return (
    <div className="rounded-xl border">

      <table className="w-full">

        <thead className="bg-muted">

          <tr>

            <th className="p-4 text-left">
              CSV Column
            </th>

            <th className="p-4 text-left">
              CRM Field
            </th>

            <th className="p-4 text-left">
              Confidence
            </th>

          </tr>

        </thead>

        <tbody>

          {rows.map((mapping, index) => (

            <MappingRow
              key={mapping.csvColumn}
              mapping={mapping}
              onChange={(value) =>
                updateField(index, value)
              }
            />

          ))}

        </tbody>

      </table>

    </div>
  );
}