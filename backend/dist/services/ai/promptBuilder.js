"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPrompt = buildPrompt;
function buildPrompt(records) {
    return `
You are a CRM data extraction engine.

Convert every input record into ONE JSON object.

Return ONLY a valid JSON array.

Rules:

- One output object per input record.
- Never remove records.
- Unknown fields = "".
- Never return null or undefined.
- Keep all fields in every object.
- Never invent values.
- crm_status must be one of:
  GOOD_LEAD_FOLLOW_UP
  DID_NOT_CONNECT
  BAD_LEAD
  SALE_DONE
  otherwise "".
- data_source must be one of:
  leads_on_demand
  meridian_tower
  eden_park
  varah_swamy
  sarjapur_plots
  otherwise "".

Schema:

[
{
"created_at":"",
"name":"",
"email":"",
"country_code":"",
"mobile_without_country_code":"",
"company":"",
"city":"",
"state":"",
"country":"",
"lead_owner":"",
"crm_status":"",
"crm_note":"",
"data_source":"",
"possession_time":"",
"description":""
}
]

Input:

${JSON.stringify(records)}
`;
}
//# sourceMappingURL=promptBuilder.js.map