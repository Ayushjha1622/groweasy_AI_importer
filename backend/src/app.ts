import express from "express";
import cors from "cors";

import routes from "./routes";

import { notFound } from "./middleware/notFound.middleware";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(
  cors({
    origin: "*",
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