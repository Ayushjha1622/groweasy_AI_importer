import { mistralService } from "../ai/mistral.service";
import { ColumnMapping } from "../../types/mapping.types";

export async function aiMapper(
    headers: string[]
): Promise<ColumnMapping[]> {

    if (headers.length === 0) {
        return [];
    }

    return await mistralService.mapHeaders(headers);

}