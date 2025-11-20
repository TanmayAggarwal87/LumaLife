const responseShape = `Respond with strictly valid JSON:
{
  "summary": "short overview string",
  "problems": ["issue 1"],
  "risks": ["risk if no change"],
  "advice": ["actionable idea"],
  "whatIf": ["what happens long-term if trend stays the same"],
  "confidence": 0.0-1.0 number
}`;

const basePrompt = (topic, payload) => `
You are LumaLife's AI health strategist. Analyze the user's ${topic} data and coach them.
Input data:
${payload}

${responseShape}
`;

export const sleepPrompt = (sleep) =>
  basePrompt("sleep hygiene", JSON.stringify(sleep, null, 2)) +
  `
Focus on patterns between deep/light/REM sleep and overall minutes. Highlight bedtime consistency.
`;

export const activityPrompt = (activity) =>
  basePrompt("activity & steps", JSON.stringify(activity, null, 2)) +
  `
Discuss steps vs goals, cardio minutes, and distance trends. Mention heatmap intensity if provided.
`;

export const nutritionPrompt = (nutrition) =>
  basePrompt("calories & macros", JSON.stringify(nutrition, null, 2)) +
  `
Call out over/under shooting calories/protein targets.
`;

export const heartPrompt = (heart) =>
  basePrompt("heart rate & stress", JSON.stringify(heart, null, 2)) +
  `
Explain what elevated / suppressed averages imply and the nervous system impact.
`;

export const workoutPrompt = (workouts) =>
  basePrompt("workout adherence", JSON.stringify(workouts, null, 2)) +
  `
Talk about workout variety, spacing, and consistency.`;

