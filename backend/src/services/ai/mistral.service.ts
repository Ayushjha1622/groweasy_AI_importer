import { Mistral } from "@mistralai/mistralai";

import { env } from "../../config/env";
import { logger } from "../../config/logger";

import { retry } from "../../utils/retry";

import { buildPrompt } from "./promptBuilder";
import { crmArraySchema } from "./responseValidator";
import { extractJsonArray } from "../../utils/jsonExtractor";
import { ColumnMapping } from "../../types/mapping.types";
const client = new Mistral({
    apiKey: env.MISTRAL_API_KEY,
});

class MistralService {
    private cleanResponse(content: string): string {
        return content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
    }

    private normalizeRecord(record: any) {

    return {

        created_at: record.created_at ?? "",

        name: record.name ?? "",

        email: record.email ?? "",

        country_code: record.country_code ?? "",

        mobile_without_country_code:
            record.mobile_without_country_code ?? "",

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

private normalizeHeaderMapping(mapping: any): ColumnMapping {

    return {

        csvColumn: mapping.csvColumn ?? "",

        mappedField: mapping.mappedField ?? "",

        confidence: Number(mapping.confidence ?? 0),

        required: false,

    };

}

    async extract(records: unknown[]) {
        return retry(async () => {
            const prompt = buildPrompt(records);

            logger.info(
                `Sending ${records.length} records to Mistral`
            );

            const response = await client.chat.complete({
                model: env.MISTRAL_MODEL,
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

            const cleaned =
                typeof content === "string"
                    ? this.cleanResponse(content)
                    : this.cleanResponse(content.toString());

                    logger.info("========== RAW MISTRAL RESPONSE ==========");
                    logger.info(cleaned);
                    logger.info("=========================================");


            let parsed: unknown;

try {
   const json = extractJsonArray(cleaned);

parsed = JSON.parse(json);
} catch (error) {
    logger.error(error);
    throw new Error("Invalid JSON returned by Mistral.");
}

if (!Array.isArray(parsed)) {
    throw new Error("Expected Mistral to return a JSON array.");
}

const normalized = parsed.map((record) =>
    this.normalizeRecord(record)
);

const validated = crmArraySchema.parse(normalized);

logger.info(
    `Successfully extracted ${validated.length} CRM records`
);

return validated;
        });
    }

    async mapHeaders(
    headers: string[]
): Promise<ColumnMapping[]> {

    return retry(async () => {

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

        logger.info(
            `Sending ${headers.length} headers to Mistral`
        );

        const response = await client.chat.complete({

            model: env.MISTRAL_MODEL,

            temperature: 0,

            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],

        });

        const content =
            response.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error(
                "Empty response from Mistral."
            );
        }

        const cleaned =
            typeof content === "string"
                ? this.cleanResponse(content)
                : this.cleanResponse(
                    content.toString()
                );

        logger.info("===== AI HEADER MAPPING =====");
        logger.info(cleaned);

        let parsed: unknown;

        try {

            parsed = JSON.parse(
                extractJsonArray(cleaned)
            );

        } catch {

            throw new Error(
                "Invalid JSON returned by Mistral."
            );

        }

        if (!Array.isArray(parsed)) {

            throw new Error(
                "Expected JSON array."
            );

        }

        return parsed.map(mapping =>
            this.normalizeHeaderMapping(mapping)
        );

    });

}
}

export const mistralService = new MistralService();