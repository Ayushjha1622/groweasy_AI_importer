export interface PreviewData {
    fileName: string;
    totalRows: number;
    totalColumns: number;
    duplicateRows: number;
    missingValues: number;
    headers: string[];
    preview: Record<string, string>[];
}

export interface PreviewResponse {
    success: boolean;
    data: PreviewData;
}