import express from "express";
import cors from "cors";

import routes from "./routes";

import { notFound } from "./middleware/notFound.middleware";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      const allowedOrigins = [
        "http://localhost:3000",
        "https://groweasy-ai-importer-sand.vercel.app",
      ];

      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.includes(".vercel.app")
      ) {
        return callback(null, true);
      }

      callback(new Error("CORS Not Allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use("/api", routes);

// 404
app.use(notFound);

// Error Handler
app.use(errorHandler);

export default app;