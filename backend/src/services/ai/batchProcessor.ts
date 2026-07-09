export function createBatches<T>(
    records: T[],
    size = 10
): T[][] {

    const batches: T[][] = [];

    for (
        let i = 0;
        i < records.length;
        i += size
    ) {

        batches.push(
            records.slice(i, i + size)
        );

    }

    return batches;

}