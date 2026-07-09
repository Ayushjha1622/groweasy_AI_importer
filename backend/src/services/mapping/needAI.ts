import { CRMRecord } from "../../types/crm.types";

export function needsAI(record: CRMRecord): boolean {

    return (

        !record.name ||

        !record.email ||

        !record.mobile_without_country_code ||

        !record.company ||

        !record.city ||

        !record.state ||

        !record.country ||

        !record.crm_status ||

        !record.data_source

    );

}