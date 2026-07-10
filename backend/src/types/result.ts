export interface SkippedRecord {
  row: Record<string, unknown>;
  reason: string;
}

export interface ImportResult {
  total: number;
  imported: number;
  skipped: number;
  successRate: number;
  importedRecords: Record<string, unknown>[];
  skippedRecords: SkippedRecord[];
}