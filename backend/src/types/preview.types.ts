export interface PreviewResponse {

    fileName: string;

    totalRows: number;

    totalColumns: number;

    duplicateRows: number;

    missingValues: number;

    headers: string[];

    preview: Record<string, string>[];

}