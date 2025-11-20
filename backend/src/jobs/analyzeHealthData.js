import cron from "node-cron";

import HealthSnapshot from "../models/HealthSnapshot.js";
import { generateAnalysis } from "../services/analysisService.js";

const MAX_BATCH = 3;

export const processPendingSnapshots = async () => {
  const pending = await HealthSnapshot.find({ status: "pending" })
    .sort({ createdAt: 1 })
    .limit(MAX_BATCH);

  if (!pending.length) {
    return;
  }

  for (const snapshot of pending) {
    try {
      snapshot.status = "processing";
      await snapshot.save();

      const analysis = await generateAnalysis(snapshot.metrics);

      snapshot.analysis = analysis;
      snapshot.status = "completed";
      snapshot.analyzedAt = new Date();
      snapshot.error = undefined;
      await snapshot.save();
    } catch (error) {
      snapshot.status = "failed";
      snapshot.error = error.message;
      await snapshot.save();
    }
  }
};

export const startAnalysisJob = () => {
  if (!process.env.GEMINI_API_KEY) {
    console.warn(
      "GEMINI_API_KEY missing. Health analysis pipeline is disabled."
    );
    return;
  }

  cron.schedule("*/5 * * * *", () => {
    processPendingSnapshots().catch((error) => {
      console.error("Health analysis job failed", error);
    });
  });

  console.log("Health analysis job scheduled every 5 minutes.");
};

