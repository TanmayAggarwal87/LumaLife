# LumaLife Backend

Express + MongoDB service that stores normalized Health Connect metrics and runs Gemini-based analyses.

## Setup

```bash
cd backend
npm install
cp env.example .env   # create this file with PORT, MONGODB_URI, GEMINI_API_KEY
npm run start
```

- `PORT` defaults to `3000`.
- `MONGODB_URI` should point to your Atlas/local cluster.
- `GEMINI_API_KEY` must be a valid Gemini 2.5 Flash key. If it is missing, uploads still work but the AI analysis job is skipped.

## REST API

### POST `/api/health/upload`

Stores the latest metrics snapshot and queues it for AI analysis.

#### Request body

```json
{
  "userId": "demo-user-001",
  "timestamp": "2025-11-20T09:20:00.000Z",
  "metrics": {
    "segments": {
      "Daily": { "sleep": { "totalSleep": "7 h 10 m" }, "activity": { "steps": 10450 } }
    },
    "stress": { "level": "Moderate", "pattern": [{ "value": 55 }] },
    "workouts": [{ "title": "Run", "durationMinutes": 35 }]
  }
}
```

#### Response

```json
{
  "success": true,
  "snapshotId": "6741e9cc0049bab4f6943d21",
  "status": "pending"
}
```

#### Validation

- `userId` – required string
- `timestamp` – ISO date (optional; defaults to server time)
- `metrics` – JSON object matching the frontend's normalized shape

## Data model

`HealthSnapshot` collection:

| field      | type    | description                               |
| ---------- | ------- | ----------------------------------------- |
| `userId`   | String  | LumaLife user id                          |
| `timestamp`| Date    | When the metrics were captured            |
| `metrics`  | Mixed   | Raw health payload from the app           |
| `status`   | String  | `pending`, `processing`, `completed`, `failed` |
| `analysis` | Mixed   | Gemini output (per-silo JSON summaries)   |
| `error`    | String  | Last failure reason                       |

## AI Analysis Pipeline

- Defined in `src/jobs/analyzeHealthData.js`
- Runs every 5 minutes (using `node-cron`) while `GEMINI_API_KEY` is set.
- Batch size: 3 pending records per tick.
- For each metric (sleep, activity/steps, calories, heart rate, workouts) the job:
  1. Builds a prompt defined in `src/prompts/healthPrompts.js`.
  2. Calls `gemini-2.5-flash` via `@google/generative-ai`.
  3. Persists the structured JSON `{ summary, problems, risks, advice, whatIf, confidence }`.

If Gemini returns non-JSON output, the service stores a placeholder result with `confidence: 0` and logs the error.

## Sample Analysis Output

```json
{
  "sleep": {
    "summary": "Deep sleep improved 12% week-over-week.",
    "problems": ["Late bedtime skews REM balance"],
    "risks": ["Sustained REM deficit increases irritability"],
    "advice": ["Anchor lights-out at 10:45 PM", "Stop caffeine after 2 PM"],
    "whatIf": ["Maintaining current short nights will drop recovery capacity by ~8% over 6 weeks"],
    "confidence": 0.82
  }
}
```

Use these docs as the canonical reference when connecting the Expo app or triggering the pipeline manually.

-- made by docify -- 
