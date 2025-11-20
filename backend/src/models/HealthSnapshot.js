import mongoose from "mongoose";

const HealthSnapshotSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    timestamp: { type: Date, default: Date.now },
    metrics: { type: mongoose.Schema.Types.Mixed, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
      index: true,
    },
    analysis: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    analyzedAt: { type: Date },
    error: { type: String },
  },
  { timestamps: true }
);

const HealthSnapshot = mongoose.model("HealthSnapshot", HealthSnapshotSchema);

export default HealthSnapshot;

