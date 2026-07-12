"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mappingService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csvParser_service_1 = require("../csv/csvParser.service");
const heuristicMapper_1 = require("./heuristicMapper");
const needHeader_1 = require("./needHeader");
const aiMapper_1 = require("./aiMapper");
class MappingService {
    async getMappings(fileId) {
        const filePath = path_1.default.join(process.cwd(), "src", "uploads", fileId);
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error("Uploaded file not found.");
        }
        const rows = await (0, csvParser_service_1.parseCSV)(filePath);
        if (rows.length === 0) {
            return [];
        }
        const headers = Object.keys(rows[0]);
        console.log("CSV Headers:");
        console.table(headers);
        // Step 1: Rule-based mapping
        const mappings = (0, heuristicMapper_1.heuristicMapper)(headers);
        console.log("Rule Mapping:");
        console.table(mappings);
        // Step 2: Find headers needing AI
        const aiCandidates = (0, needHeader_1.needHeaderAI)(mappings);
        if (aiCandidates.length === 0) {
            console.log("All headers mapped using heuristic rules.");
            return mappings;
        }
        console.log(`Sending ${aiCandidates.length} headers to AI...`);
        // Step 3: AI mapping
        const headersForAI = aiCandidates.map((mapping) => mapping.csvColumn);
        const aiMappings = await (0, aiMapper_1.aiMapper)(headersForAI);
        console.log("AI Mapping:");
        console.table(aiMappings);
        // Step 4: Merge heuristic + AI
        const finalMappings = mappings.map(mapping => {
            const aiResult = aiMappings.find(ai => ai.csvColumn === mapping.csvColumn);
            return aiResult ?? mapping;
        });
        console.log("Final Mapping:");
        console.table(finalMappings);
        return finalMappings;
    }
}
exports.mappingService = new MappingService();
//# sourceMappingURL=mapping.service.js.map