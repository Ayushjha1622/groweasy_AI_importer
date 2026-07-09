import { parseCSV } from "./csvParser.service";

export async function previewCSV(

    filePath: string

) {

    const rows = await parseCSV(filePath);

    return {

        totalRows: rows.length,

        headers:

            rows.length > 0

                ? Object.keys(rows[0])

                : [],

        preview:

            rows.slice(0, 10)

    };

}