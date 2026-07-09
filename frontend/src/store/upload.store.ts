import { create } from "zustand";

interface UploadStore {

    fileId: string;

    file: File | null;

    setFile: (file: File) => void;

    setFileId: (id: string) => void;

}

export const useUploadStore = create<UploadStore>((set) => ({

    fileId: "",

    file: null,

    setFile: (file) => set({ file }),

    setFileId: (fileId) => set({ fileId }),

}));