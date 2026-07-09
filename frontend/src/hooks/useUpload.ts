"use client";

import { useMutation } from "@tanstack/react-query";

import { uploadCSV } from "@/services/upload.service";

export function useUpload() {

    return useMutation({

        mutationFn: uploadCSV,

    });

}