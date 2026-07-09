import fs from "fs";
import path from "path";

export const uploadDirectory = path.join(process.cwd(), "src", "uploads");

export function ensureUploadDirectory() {
    if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory, {
            recursive: true
        });
    }
}