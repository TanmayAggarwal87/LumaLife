import { z } from "zod";

import HealthSnapshot from "../models/HealthSnapshot.js";

const metricsSchema = z
  .object({
    segments: z
      .record(z.string(), z.any())
      .optional()
      .describe("Normalized metrics bucket"),
  })
  .passthrough();

const uploadSchema = z.object({
  userId: z.string().min(1, "userId is required"),
  timestamp: z.string().datetime().optional(),
  metrics: metricsSchema,
});

const formatError = (issue) =>
  issue.path.length ? `${issue.path.join(".")}: ${issue.message}` : issue.message;

export const uploadHealthData = async (req, res, next) => {
  try {
    const parsed = uploadSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.issues.map(formatError),
      });
    }

    const snapshot = await HealthSnapshot.create({
      userId: parsed.data.userId,
      timestamp: parsed.data.timestamp || new Date(),
      metrics: parsed.data.metrics,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      snapshotId: snapshot._id,
      status: snapshot.status,
    });
  } catch (error) {
    return next(error);
  }
};

