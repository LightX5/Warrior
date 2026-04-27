import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import bookingRoutes from "./routes/bookingRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import warriorAiRoutes from "./routes/warriorAiRoutes.js";
import { connectDB } from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "..", "dist");
const configuredOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const localOriginPattern = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
const allowedOrigins = new Set(configuredOrigins);

const PORT = process.env.PORT || 5000;

export const createServerApp = () => {
  const app = express();

  const isAllowedOrigin = (origin) =>
    !origin || allowedOrigins.has(origin) || localOriginPattern.test(origin);

  const apiCors = cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
  });

  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Warrior Lens Studio API is running." });
  });

  app.use("/api/bookings", apiCors, bookingRoutes);
  app.use("/api/contact", apiCors, contactRoutes);
  app.use("/api/warrior-ai", apiCors, warriorAiRoutes);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(distPath));

    app.get(/.*/, (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export const startServer = async () => {
  const app = createServerApp();

  if (process.env.SKIP_DB !== "true") {
    await connectDB();
  }

  return app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  startServer();
}
