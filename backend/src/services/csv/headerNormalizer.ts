const HEADER_MAPPING: Record<string, string> = {

    fullname: "name",

    full_name: "name",

    customername: "name",

    customer_name: "name",

    clientname: "name",

    emailaddress: "email",

    email: "email",

    e_mail: "email",

    mail: "email",

    mobilenumber: "mobile",

    mobile: "mobile",

    phone: "mobile",

    phonenumber: "mobile",

    contact: "mobile",

    city: "city",

    state: "state",

    country: "country",

    company: "company",

    notes: "crm_note",

    remarks: "crm_note"

};

export function normalizeHeader(header: string): string {

    const normalized = header

        .trim()

        .toLowerCase()

        .replace(/[\s-]/g, "");

    return HEADER_MAPPING[normalized] || normalized;

}