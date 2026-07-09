import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatHeader(header: string): string {
    return header
        .replace(/_/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .replace(/\bCrm\b/g, "CRM")
        .replace(/\bApi\b/g, "API")
        .replace(/\bId\b/g, "ID")
        .trim();
}