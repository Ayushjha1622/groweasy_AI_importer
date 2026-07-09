export interface MappingItem {
  csvColumn: string;
  mappedField: string;
  confidence: number;
  required: boolean;
}

export interface MappingResponse {
  mappings: MappingItem[];
}