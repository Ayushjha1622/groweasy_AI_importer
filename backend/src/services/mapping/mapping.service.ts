import fs from "fs";
import path from "path";

import { parseCSV } from "../csv/csvParser.service";

import { heuristicMapper } from "./heuristicMapper";
import { needHeaderAI } from "./needHeader";
import { aiMapper } from "./aiMapper";

import { ColumnMapping } from "../../types/mapping.types";

class MappingService {

    async getMappings(
        fileId: string
    ): Promise<ColumnMapping[]> {

        const filePath = path.join(
            process.cwd(),
            "src",
            "uploads",
            fileId
        );

        if (!fs.existsSync(filePath)) {
            throw new Error("Uploaded file not found.");
        }

        const rows = await parseCSV(filePath);

        if (rows.length === 0) {
            return [];
        }

        const headers = Object.keys(rows[0]);

        console.log("CSV Headers:");
        console.table(headers);

        // Step 1: Rule-based mapping
        const mappings = heuristicMapper(headers);

        console.log("Rule Mapping:");
        console.table(mappings);

        // Step 2: Find headers needing AI
        const aiCandidates = needHeaderAI(mappings);

        if (aiCandidates.length === 0) {

            console.log(
                "All headers mapped using heuristic rules."
            );

            return mappings;
        }

        console.log(
            `Sending ${aiCandidates.length} headers to AI...`
        );

        // Step 3: AI mapping
      const headersForAI: string[] =
    aiCandidates.map(
        (mapping: ColumnMapping) =>
            mapping.csvColumn
    );

const aiMappings =
    await aiMapper(headersForAI);
        console.log("AI Mapping:");
        console.table(aiMappings);

        // Step 4: Merge heuristic + AI
        const finalMappings = mappings.map(mapping => {

            const aiResult = aiMappings.find(
                ai =>
                    ai.csvColumn === mapping.csvColumn
            );

            return aiResult ?? mapping;

        });

        console.log("Final Mapping:");
        console.table(finalMappings);

        return finalMappings;
    }
}

export const mappingService = new MappingService();