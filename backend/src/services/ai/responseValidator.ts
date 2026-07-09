import { z } from "zod";

export const crmSchema = z.object({

   created_at: z.string().nullish(),

    name: z.string().nullish(),

    email: z.string().nullish(),

    country_code: z.string().nullish(),

    mobile_without_country_code: z.string().nullish(),

    company: z.string().nullish(),

    city: z.string().nullish(),

    state: z.string().nullish(),

    country: z.string().nullish(),

    lead_owner: z.string().nullish(),

    crm_note: z.string().nullish(),

    possession_time: z.string().nullish(),

    description: z.string().nullish(),

    crm_status: z.union([
    z.enum([
        "GOOD_LEAD_FOLLOW_UP",
        "DID_NOT_CONNECT",
        "BAD_LEAD",
        "SALE_DONE"
    ]),
    z.literal("")
]).nullish(),

data_source: z.union([
    z.enum([
        "leads_on_demand",
        "meridian_tower",
        "eden_park",
        "varah_swamy",
        "sarjapur_plots"
    ]),
    z.literal("")
]).nullish(),

});

export const crmArraySchema =
    z.array(crmSchema);