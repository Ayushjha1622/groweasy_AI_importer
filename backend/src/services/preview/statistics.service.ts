export function countMissingValues(
    rows: Record<string, string>[]
): number {

    let missing = 0;

    rows.forEach(row => {

        Object.values(row).forEach(value => {

            if (
                value === undefined ||
                value === null ||
                value.toString().trim() === ""
            ) {
                missing++;
            }

        });

    });

    return missing;
}

export function countDuplicateRows(
    rows: Record<string, string>[]
): number {

    const set = new Set<string>();

    let duplicates = 0;

    rows.forEach(row => {

        const key = JSON.stringify(row);

        if (set.has(key)) {
            duplicates++;
        } else {
            set.add(key);
        }

    });

    return duplicates;
}