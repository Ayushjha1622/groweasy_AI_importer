export async function retry<T>(
    fn: () => Promise<T>,
    retries = 5,
    baseDelay = 5000
): Promise<T> {

    let lastError: unknown;

    for (let attempt = 1; attempt <= retries; attempt++) {

        try {
            return await fn();
        } catch (error: any) {

            lastError = error;

            const isRateLimit =
                error?.status === 429 ||
                error?.statusCode === 429 ||
                (typeof error?.message === "string" &&
                    error.message.includes("429"));

            const waitMs = isRateLimit
                ? baseDelay * attempt          // 5s, 10s, 15s, 20s, 25s
                : baseDelay;                   // fixed 5s for other errors

            if (attempt < retries) {
                console.warn(
                    `Attempt ${attempt} failed${isRateLimit ? " (rate limited)" : ""}. Retrying in ${waitMs / 1000}s...`
                );
                await new Promise(resolve =>
                    setTimeout(resolve, waitMs)
                );
            }

        }
    }

    throw lastError;
}