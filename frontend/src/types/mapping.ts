export interface ColumnMapping {
  csvColumn: string;
  mappedField: string;
  confidence: number;
  required: boolean;
}

export interface MappingResponse {
  fileId: string;
  totalColumns: number;
  mapped: number;
  needsReview: number;
  mappings: ColumnMapping[];
}