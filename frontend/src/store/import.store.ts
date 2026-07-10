import { create } from "zustand";
import { ImportSummary } from "../types/import";

interface ImportStore {
  result: ImportSummary | null;

  setResult: (result: ImportSummary) => void;

  clearResult: () => void;
}

export const useImportStore = create<ImportStore>((set) => ({
  result: null,

  setResult: (result) =>
    set({
      result,
    }),

  clearResult: () =>
    set({
      result: null,
    }),
}));