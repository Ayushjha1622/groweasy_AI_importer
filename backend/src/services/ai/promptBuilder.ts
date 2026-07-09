export function buildPrompt(records: unknown[]) {
    return `
You are an expert CRM data extraction engine.

Your task is to convert the given CSV records into a JSON array matching the exact schema below.

Return ONLY valid JSON.

Do NOT return markdown.

Do NOT use \`\`\`json.

Do NOT explain anything.

==========================
OUTPUT SCHEMA
==========================

[
  {
    "created_at": "",
    "name": "",
    "email": "",
    "country_code": "",
    "mobile_without_country_code": "",
    "company": "",
    "city": "",
    "state": "",
    "country": "",
    "lead_owner": "",
    "crm_status": "",
    "crm_note": "",
    "data_source": "",
    "possession_time": "",
    "description": ""
  }
]

==========================
RULES
==========================

1. Return ONE object for every input record.

2. Never remove records unless BOTH email AND mobile number are missing.

3. If a field cannot be determined,
return an empty string ("").

NEVER return:

- null
- undefined
- N/A

4. created_at must be a valid JavaScript date string.

5. crm_status MUST be one of:

GOOD_LEAD_FOLLOW_UP
DID_NOT_CONNECT
BAD_LEAD
SALE_DONE

If unsure, return "".

6. data_source MUST be one of:

leads_on_demand
meridian_tower
eden_park
varah_swamy
sarjapur_plots

Otherwise return "".

7. If multiple phone numbers exist:

- First phone → mobile_without_country_code
- Remaining phones → crm_note

8. If multiple emails exist:

- First email → email
- Remaining emails → crm_note

9. Preserve all useful remarks inside crm_note.

10. Never invent information.

11. Every output object MUST contain ALL fields.

12. Never omit any field.

==========================
INPUT RECORDS
==========================

${JSON.stringify(records)}

`;
}