import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
    PORT: number;
    NODE_ENV: string;

    MISTRAL_API_KEY: string;
    MISTRAL_MODEL: string;

    MAX_BATCH_SIZE: number;
    MAX_FILE_SIZE: number;
}

function requireEnv(key: string): string {
    const value = process.env[key];

    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }

    return value;
}

export const env: EnvConfig = {

    PORT: Number(process.env.PORT) || 5000,

    NODE_ENV: process.env.NODE_ENV || "development",

    MISTRAL_API_KEY: requireEnv("MISTRAL_API_KEY"),

    MISTRAL_MODEL:
        process.env.MISTRAL_MODEL || "mistral-small-latest",

    MAX_BATCH_SIZE:
        Number(process.env.MAX_BATCH_SIZE) || 25,

    MAX_FILE_SIZE:
        Number(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024

};