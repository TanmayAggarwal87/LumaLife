import { GoogleGenAI } from "@google/genai";

import {
  sleepPrompt,
  activityPrompt,
  nutritionPrompt,
  heartPrompt,
  workoutPrompt,
} from "../prompts/healthPrompts.js";

const modelName = "gemini-2.5-flash";
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

const cleanJson = (text) =>
  text
    .replace(/^```json/gim, "")
    .replace(/^```/gim, "")
    .replace(/```$/gim, "")
    .trim();

const callModel = async (prompt) => {
  if (!genAI) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const response = await genAI.models.generateContent({
    model: modelName,
    contents: prompt,
    generationConfig: {
      temperature: 0.4,
      responseMimeType: "application/json",
    },
  });

  const text =
    (typeof response.text === "function" ? response.text() : response.text) ??
    response?.response?.text?.() ??
    "{}";
  return JSON.parse(cleanJson(text));
};

const safeCall = async (prompt, fallback = {}) => {
  try {
    return await callModel(prompt);
  } catch (error) {
    return {
      summary: "AI analysis unavailable",
      problems: [],
      risks: [],
      advice: [],
      whatIf: [],
      confidence: 0,
      error: error.message,
      ...fallback,
    };
  }
};

const buildHeartPayload = (metrics) => ({
  stress: metrics.stress,
  steps: metrics.segments?.Daily?.activity?.steps ?? 0,
  cardioMinutes: metrics.segments?.Daily?.activity?.cardio ?? 0,
});

export const generateAnalysis = async (metrics) => {
  const daily = metrics?.segments?.Daily ?? {};

  const [sleep, activity, nutrition, heart, workouts] = await Promise.all([
    safeCall(sleepPrompt(daily.sleep || {})),
    safeCall(
      activityPrompt({
        ...daily.activity,
        heatmap: metrics.heatmap,
      })
    ),
    safeCall(nutritionPrompt(daily.nutrition || {})),
    safeCall(heartPrompt(buildHeartPayload(metrics))),
    safeCall(workoutPrompt(metrics.workouts || [])),
  ]);

  return {
    sleep,
    activity,
    nutrition,
    heart,
    workouts,
  };
};

