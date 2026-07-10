"use client";

import { useMutation } from "@tanstack/react-query";

import { processImport } from "@/services/import.service";

export function useImport() {
  return useMutation({
    mutationFn: processImport,
  });
}