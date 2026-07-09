import { CRMRecord } from "../../types/crm.types";

const HEADER_MAP: Record<string, keyof CRMRecord> = {
    name: "name",
    fullname: "name",
    customername: "name",

    email: "email",
    emailaddress: "email",

    phone: "mobile_without_country_code",
    mobile: "mobile_without_country_code",
    mobilenumber: "mobile_without_country_code",

    company: "company",

    city: "city",

    state: "state",

    country: "country",

    createdat: "created_at",

    date: "created_at",

    remarks: "crm_note",

    notes: "crm_note"
};

export function mapRow(row: Record<string, any>): CRMRecord {

    const crm: CRMRecord = {};

    Object.entries(row).forEach(([key, value]) => {

        const normalized = key
            .replace(/[\s_-]/g, "")
            .toLowerCase();

        const field = HEADER_MAP[normalized];

        if (field) {
            (crm as any)[field] = value;
        }

    });

    return crm;
}