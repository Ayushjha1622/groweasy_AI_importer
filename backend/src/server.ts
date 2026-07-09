import app from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";


logger.info({
    keyLoaded: !!env.MISTRAL_API_KEY,
    keyPrefix: env.MISTRAL_API_KEY.substring(0, 8)
});

app.listen(env.PORT, () => {
    logger.info(`🚀 Server running at http://localhost:${env.PORT}`);
});