export function getConfidence(
    csvColumn: string,
    mappedField: string
): number {

    if (!mappedField) {
        return 0;
    }

    const csv = csvColumn
        .replace(/[\s_-]/g, "")
        .toLowerCase();

    const crm = mappedField
        .replace(/[\s_-]/g, "")
        .toLowerCase();

    // Exact match
    if (csv === crm) {
        return 100;
    }

    // Partial match
    if (
        csv.includes(crm) ||
        crm.includes(csv)
    ) {
        return 95;
    }

    // Alias match
    return 90;
}