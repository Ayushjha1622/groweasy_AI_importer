"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeHeader = normalizeHeader;
const HEADER_MAPPING = {
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
function normalizeHeader(header) {
    const normalized = header
        .trim()
        .toLowerCase()
        .replace(/[\s-]/g, "");
    return HEADER_MAPPING[normalized] || normalized;
}
//# sourceMappingURL=headerNormalizer.js.map