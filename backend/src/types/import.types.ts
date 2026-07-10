export interface ImportRequest {

    fileId: string;

}

export interface ImportSummary {

    total: number;

    imported: number;

    skipped: number;

    duration: number;

}

export interface ImportResult {

    imported: Record<string, unknown>[];

    skipped: Record<string, unknown>[];

    summary: ImportSummary;

}