"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mistralService = void 0;
const mistralai_1 = require("@mistralai/mistralai");
const env_1 = require("../../config/env");
const logger_1 = require("../../config/logger");
const retry_1 = require("../../utils/retry");
const promptBuilder_1 = require("./promptBuilder");
const responseValidator_1 = require("./responseValidator");
const jsonExtractor_1 = require("../../utils/jsonExtractor");
const client = new mistralai_1.Mistral({
    apiKey: env_1.env.MISTRAL_API_KEY,
});
class MistralService {
    cleanResponse(content) {
        return content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
    }
    normalizeRecord(record) {
        return {
            created_at: record.created_at ?? "",
            name: record.name ?? "",
            email: record.email ?? "",
            country_code: record.country_code ?? "",
            mobile_without_country_code: record.mobile_without_country_code ?? "",
            company: record.company ?? "",
            city: record.city ?? "",
            state: record.state ?? "",
            country: record.country ?? "",
            lead_owner: record.lead_owner ?? "",
            crm_note: record.crm_note ?? "",
            possession_time: record.possession_time ?? "",
            description: record.description ?? "",
            crm_status: [
                "GOOD_LEAD_FOLLOW_UP",
                "DID_NOT_CONNECT",
                "BAD_LEAD",
                "SALE_DONE"
            ].includes(record.crm_status)
                ? record.crm_status
                : "",
            data_source: [
                "leads_on_demand",
                "meridian_tower",
                "eden_park",
                "varah_swamy",
                "sarjapur_plots"
            ].includes(record.data_source)
                ? record.data_source
                : "",
        };
    }
    normalizeHeaderMapping(mapping) {
        return {
            csvColumn: mapping.csvColumn ?? "",
            mappedField: mapping.mappedField ?? "",
            confidence: Number(mapping.confidence ?? 0),
            required: false,
        };
    }
    async extract(records) {
        console.log("AI records:", records.length);
        return (0, retry_1.retry)(async () => {
            const prompt = (0, promptBuilder_1.buildPrompt)(records);
            logger_1.logger.info(`Sending ${records.length} records to Mistral`);
            const response = await client.chat.complete({
                model: env_1.env.MISTRAL_MODEL,
                temperature: 0,
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            });
            const content = response.choices?.[0]?.message?.content;
            if (!content) {
                throw new Error("Empty response from Mistral.");
            }
            const cleaned = typeof content === "string"
                ? this.cleanResponse(content)
                : this.cleanResponse(content.toString());
            logger_1.logger.info("========== RAW MISTRAL RESPONSE ==========");
            logger_1.logger.info(cleaned);
            logger_1.logger.info("=========================================");
            let parsed;
            try {
                const json = (0, jsonExtractor_1.extractJsonArray)(cleaned);
                parsed = JSON.parse(json);
            }
            catch (error) {
                logger_1.logger.error(error);
                throw new Error("Invalid JSON returned by Mistral.");
            }
            if (!Array.isArray(parsed)) {
                throw new Error("Expected Mistral to return a JSON array.");
            }
            const normalized = parsed.map((record) => this.normalizeRecord(record));
            const validated = responseValidator_1.crmArraySchema.parse(normalized);
            if (validated.length !== records.length) {
                logger_1.logger.warn(`Expected ${records.length} records, got ${validated.length}`);
            }
            logger_1.logger.info(`Successfully extracted ${validated.length} CRM records`);
            return validated;
        });
    }
    async mapHeaders(headers) {
        return (0, retry_1.retry)(async () => {
            const prompt = `
You are an expert CRM field mapper.

Map every CSV header to the best CRM field.

Return ONLY valid JSON.

CRM Fields:

created_at
name
email
country_code
mobile_without_country_code
company
city
state
country
lead_owner
crm_status
crm_note
data_source
possession_time
description

CSV Headers:

${JSON.stringify(headers)}

Return format:

[
  {
    "csvColumn": "Customer Name",
    "mappedField": "name",
    "confidence": 98
  }
]
`;
            logger_1.logger.info(`Sending ${headers.length} headers to Mistral`);
            const response = await client.chat.complete({
                model: env_1.env.MISTRAL_MODEL,
                temperature: 0,
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            });
            const content = response.choices?.[0]?.message?.content;
            if (!content) {
                throw new Error("Empty response from Mistral.");
            }
            const cleaned = typeof content === "string"
                ? this.cleanResponse(content)
                : this.cleanResponse(content.toString());
            logger_1.logger.info("===== AI HEADER MAPPING =====");
            logger_1.logger.info(cleaned);
            let parsed;
            try {
                parsed = JSON.parse((0, jsonExtractor_1.extractJsonArray)(cleaned));
            }
            catch {
                throw new Error("Invalid JSON returned by Mistral.");
            }
            if (!Array.isArray(parsed)) {
                throw new Error("Expected JSON array.");
            }
            return parsed.map(mapping => this.normalizeHeaderMapping(mapping));
        });
    }
}
exports.mistralService = new MistralService();
//# sourceMappingURL=mistral.service.js.map