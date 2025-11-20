import "dotenv/config";

import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import healthRoutes from "./src/routes/healthRoutes.js";
import { startAnalysisJob } from "./src/jobs/analyzeHealthData.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/health", healthRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, error: err.message });
});

const connect = async () => {
  const uri =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lumalife-health";

  await mongoose.connect(uri, {
    autoIndex: true,
  });

  app.listen(port, () => {
    console.log(`API listening on port ${port}`);
  });

  startAnalysisJob();
};

connect().catch((error) => {
  console.error("Failed to initialize backend", error);
  process.exit(1);
});