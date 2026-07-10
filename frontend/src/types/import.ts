export interface ImportSummary {
  total: number;
  imported: number;
  skipped: number;
  successRate: number;
  importedRecords: Record<string, unknown>[];
  skippedRecords: {
    row: Record<string, unknown>;
    reason: string;
  }[];
}