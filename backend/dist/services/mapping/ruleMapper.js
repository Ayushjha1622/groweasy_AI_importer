"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRow = mapRow;
const HEADER_MAP = {
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
function mapRow(row) {
    const crm = {};
    Object.entries(row).forEach(([key, value]) => {
        const normalized = key
            .replace(/[\s_-]/g, "")
            .toLowerCase();
        const field = HEADER_MAP[normalized];
        if (field) {
            crm[field] = value;
        }
    });
    return crm;
}
//# sourceMappingURL=ruleMapper.js.map