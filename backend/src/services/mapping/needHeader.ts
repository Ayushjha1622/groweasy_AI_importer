import { ColumnMapping } from "../../types/mapping.types";

export function needHeaderAI(
    mappings: ColumnMapping[]
): ColumnMapping[] {

    return mappings.filter(mapping =>

        !mapping.mappedField ||

        mapping.confidence < 90

    );

}