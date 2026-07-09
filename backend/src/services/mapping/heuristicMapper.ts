import { ColumnMapping } from "../../types/mapping.types";
import { getConfidence } from "./confidence";

const REQUIRED_FIELDS = [
    "name",
    "email",
    "mobile_without_country_code",
];

const mappings: Record<string, string> = {

    // Name
    name: "name",
    fullname: "name",
    customername: "name",
    customer: "name",
    client: "name",

    // Email
    email: "email",
    emailaddress: "email",
    mail: "email",

    // Mobile
    mobile: "mobile_without_country_code",
    mobilenumber: "mobile_without_country_code",
    phone: "mobile_without_country_code",
    phonenumber: "mobile_without_country_code",
    contact: "mobile_without_country_code",
    cell: "mobile_without_country_code",

    // Company
    company: "company",
    organization: "company",
    firm: "company",

    // City
    city: "city",
    location: "city",
    town: "city",

    // State
    state: "state",
    province: "state",

    // Country
    country: "country",
    nation: "country",

    // Created At
    createdat: "created_at",
    date: "created_at",

    // Notes
    remarks: "crm_note",
    notes: "crm_note",
    comment: "crm_note",
    description: "description",

    // Lead Owner
    owner: "lead_owner",
    leadowner: "lead_owner",

    // Data Source
    source: "data_source",
    leadsource: "data_source",
    campaign: "data_source",

    // Possession
    possession: "possession_time",
    possessiontime: "possession_time",

};

export function heuristicMapper(
    headers: string[]
): ColumnMapping[] {

    return headers.map(header => {

        const normalized = header
            .replace(/[\s_-]/g, "")
            .toLowerCase();

        const mappedField =
            mappings[normalized] ?? "";

        return {

            csvColumn: header,

            mappedField,

            confidence: getConfidence(
                header,
                mappedField
            ),

            required:
                REQUIRED_FIELDS.includes(
                    mappedField
                )

        };

    });

}