"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crmArraySchema = exports.crmSchema = void 0;
const zod_1 = require("zod");
exports.crmSchema = zod_1.z.object({
    created_at: zod_1.z.string().nullish(),
    name: zod_1.z.string().nullish(),
    email: zod_1.z.string().nullish(),
    country_code: zod_1.z.string().nullish(),
    mobile_without_country_code: zod_1.z.string().nullish(),
    company: zod_1.z.string().nullish(),
    city: zod_1.z.string().nullish(),
    state: zod_1.z.string().nullish(),
    country: zod_1.z.string().nullish(),
    lead_owner: zod_1.z.string().nullish(),
    crm_note: zod_1.z.string().nullish(),
    possession_time: zod_1.z.string().nullish(),
    description: zod_1.z.string().nullish(),
    crm_status: zod_1.z.union([
        zod_1.z.enum([
            "GOOD_LEAD_FOLLOW_UP",
            "DID_NOT_CONNECT",
            "BAD_LEAD",
            "SALE_DONE"
        ]),
        zod_1.z.literal("")
    ]).nullish(),
    data_source: zod_1.z.union([
        zod_1.z.enum([
            "leads_on_demand",
            "meridian_tower",
            "eden_park",
            "varah_swamy",
            "sarjapur_plots"
        ]),
        zod_1.z.literal("")
    ]).nullish(),
});
exports.crmArraySchema = zod_1.z.array(exports.crmSchema);
//# sourceMappingURL=responseValidator.js.map