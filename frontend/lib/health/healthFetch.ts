import dayjs from "dayjs";
import {
  readRecords,
  SleepStageType,
  type ActiveCaloriesBurnedRecord,
  type DistanceRecord,
  type ExerciseSessionRecord,
  type HeartRateRecord,
  type NutritionRecord,
  type SleepSessionRecord,
  type StepsRecord,
  type TotalCaloriesBurnedRecord,
} from "react-native-health-connect";

import type { SegmentOption } from "@/components/topBar";

type Range = {
  startTime: string;
  endTime: string;
};

type MassValue = {
  value: number;
  unit: "grams" | "kilograms" | "milligrams" | "micrograms" | "ounces" | "pounds";
};

export type ActivityMetrics = {
  steps: number;
  stepsGoal: number;
  cardio: number;
  cardioGoal: number;
  calories: number;
  caloriesGoal: number;
  distance: number;
};

export type SleepMetrics = {
  sleepScore: number;
  totalSleep: string;
  deepSleep: string;
  lightSleep: string;
  remSleep: string;
};

export type NutritionMetrics = {
  calories: number;
  goal: number;
  protein: number;
  proteinGoal: number;
};

export type SegmentMetrics = {
  activity: ActivityMetrics;
  sleep: SleepMetrics;
  nutrition: NutritionMetrics;
};

export type WorkoutSummary = {
  id: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  distanceKm?: number;
  startTime: string;
  status: "Completed" | "Upcoming";
};

export type StressMetrics = {
  pattern: { value: number }[];
  level: "Low" | "Moderate" | "High";
  loggedMinutes: number;
  goalMinutes: number;
  score: number;
};

export type SummaryTile = {
  title: string;
  score: number;
  value: string;
  icon: string;
};

export type HealthMetrics = {
  segments: Record<SegmentOption, SegmentMetrics>;
  heatmap: { value: number }[];
  stress: StressMetrics;
  workouts: WorkoutSummary[];
  summary: {
    lifestyleScore: number;
    tiles: SummaryTile[];
  };
  lastUpdated: string;
};

const SEGMENT_WINDOWS: Record<SegmentOption, number> = {
  Daily: 1,
  Weekly: 7,
  Monthly: 30,
};

const ACTIVITY_GOALS: Record<SegmentOption, { steps: number; cardio: number }> = {
  Daily: { steps: 12000, cardio: 30 },
  Weekly: { steps: 84000, cardio: 210 },
  Monthly: { steps: 360000, cardio: 900 },
};

const NUTRITION_GOALS = {
  calories: 2200,
  protein: 180,
};

const DEFAULT_HEATMAP = [
  { value: 55 },
  { value: 70 },
  { value: 85 },
  { value: 95 },
  { value: 80 },
  { value: 65 },
  { value: 50 },
  { value: 45 },
  { value: 70 },
  { value: 90 },
];

const DEFAULT_WORKOUTS: WorkoutSummary[] = [
  {
    id: "default-1",
    title: "Morning Run",
    subtitle: "30 min • 5.2 km",
    durationMinutes: 30,
    distanceKm: 5.2,
    startTime: dayjs().hour(8).minute(15).toISOString(),
    status: "Completed",
  },
  {
    id: "default-2",
    title: "Gym Session",
    subtitle: "45 min • Strength Training",
    durationMinutes: 45,
    distanceKm: undefined,
    startTime: dayjs().hour(18).minute(30).toISOString(),
    status: "Upcoming",
  },
];

const DEFAULT_STRESS: StressMetrics = {
  pattern: [
    { value: 30 },
    { value: 45 },
    { value: 60 },
    { value: 75 },
    { value: 85 },
    { value: 90 },
    { value: 80 },
    { value: 65 },
    { value: 50 },
    { value: 40 },
    { value: 35 },
    { value: 45 },
    { value: 70 },
  ],
  level: "Low",
  loggedMinutes: 8,
  goalMinutes: 15,
  score: 72,
};

const DEFAULT_SEGMENTS: Record<SegmentOption, SegmentMetrics> = {
  Daily: {
    activity: {
      steps: 10240,
      stepsGoal: ACTIVITY_GOALS.Daily.steps,
      cardio: 30,
      cardioGoal: ACTIVITY_GOALS.Daily.cardio,
      calories: 320,
      caloriesGoal: 500,
      distance: 7.8,
    },
    sleep: {
      sleepScore: 82,
      totalSleep: "7 h 35 m",
      deepSleep: "1 h 45 m",
      lightSleep: "4 h 10 m",
      remSleep: "1 h 40 m",
    },
    nutrition: {
      calories: 1890,
      goal: NUTRITION_GOALS.calories,
      protein: 145,
      proteinGoal: NUTRITION_GOALS.protein,
    },
  },
  Weekly: {
    activity: {
      steps: 68400,
      stepsGoal: ACTIVITY_GOALS.Weekly.steps,
      cardio: 185,
      cardioGoal: ACTIVITY_GOALS.Weekly.cardio,
      calories: 2200,
      caloriesGoal: 3500,
      distance: 55,
    },
    sleep: {
      sleepScore: 78,
      totalSleep: "52 h 15 m",
      deepSleep: "11 h 20 m",
      lightSleep: "30 h 45 m",
      remSleep: "10 h 10 m",
    },
    nutrition: {
      calories: 8950,
      goal: NUTRITION_GOALS.calories * 7,
      protein: 620,
      proteinGoal: NUTRITION_GOALS.protein * 7,
    },
  },
  Monthly: {
    activity: {
      steps: 295000,
      stepsGoal: ACTIVITY_GOALS.Monthly.steps,
      cardio: 820,
      cardioGoal: ACTIVITY_GOALS.Monthly.cardio,
      calories: 9100,
      caloriesGoal: 15000,
      distance: 210,
    },
    sleep: {
      sleepScore: 80,
      totalSleep: "215 h 30 m",
      deepSleep: "50 h 10 m",
      lightSleep: "125 h 40 m",
      remSleep: "39 h 40 m",
    },
    nutrition: {
      calories: 31800,
      goal: NUTRITION_GOALS.calories * 30,
      protein: 2480,
      proteinGoal: NUTRITION_GOALS.protein * 30,
    },
  },
};

const DEFAULT_SUMMARY_TILES: SummaryTile[] = [
  { title: "Sleep", score: 80, value: "8h 15m", icon: "moon-outline" },
  { title: "Nutrition", score: 65, value: "1800 Kcal", icon: "restaurant-outline" },
  { title: "Activity", score: 80, value: "10,240 Steps", icon: "walk-outline" },
  { title: "Stress", score: 70, value: "Low", icon: "headset-outline" },
];

export const DEFAULT_HEALTH_METRICS: HealthMetrics = {
  segments: DEFAULT_SEGMENTS,
  heatmap: DEFAULT_HEATMAP,
  stress: DEFAULT_STRESS,
  workouts: DEFAULT_WORKOUTS,
  summary: {
    lifestyleScore: 78,
    tiles: DEFAULT_SUMMARY_TILES,
  },
  lastUpdated: dayjs().toISOString(),
};

const SEGMENT_OPTIONS: SegmentOption[] = ["Daily", "Weekly", "Monthly"];

const MINUTES_IN_DAY = 24 * 60;

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

const diffMinutes = (start: string, end: string) =>
  Math.max(0, (dayjs(end).diff(dayjs(start), "minute", true)));

const formatMinutes = (minutes: number) => {
  if (!minutes) {
    return "0 m";
  }

  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);

  if (!hrs) {
    return `${mins} m`;
  }

  return `${hrs} h ${mins} m`;
};

const toKilocalories = (energy?: ActiveCaloriesBurnedRecord["energy"] | TotalCaloriesBurnedRecord["energy"]) => {
  if (!energy) return 0;

  switch (energy.unit) {
    case "kilocalories":
      return energy.value;
    case "calories":
      return energy.value / 1000;
    case "joules":
      return energy.value / 4184;
    case "kilojoules":
      return energy.value / 4.184;
    default:
      return energy.value;
  }
};

const toGrams = (mass?: MassValue) => {
  if (!mass) return 0;

  switch (mass.unit) {
    case "grams":
      return mass.value;
    case "kilograms":
      return mass.value * 1000;
    case "milligrams":
      return mass.value / 1000;
    case "micrograms":
      return mass.value / 1_000_000;
    case "ounces":
      return mass.value * 28.3495;
    case "pounds":
      return mass.value * 453.592;
    default:
      return mass.value;
  }
};

const toKilometers = (distance?: DistanceRecord["distance"]) => {
  if (!distance) return 0;

  switch (distance.unit) {
    case "kilometers":
      return distance.value;
    case "meters":
      return distance.value / 1000;
    case "miles":
      return distance.value * 1.60934;
    case "feet":
      return distance.value * 0.0003048;
    case "inches":
      return distance.value * 0.0000254;
    default:
      return distance.value;
  }
};

const getRange = (segment: SegmentOption): Range => {
  const end = dayjs();
  const start =
    segment === "Daily"
      ? end.startOf("day")
      : end.subtract(SEGMENT_WINDOWS[segment] - 1, "day").startOf("day");

  return {
    startTime: start.toISOString(),
    endTime: end.toISOString(),
  };
};

const aggregateSteps = (records: StepsRecord[]) =>
  records.reduce((sum, record) => sum + (record.count || 0), 0);

const aggregateCalories = (
  records: (ActiveCaloriesBurnedRecord | TotalCaloriesBurnedRecord)[]
) => {
  return records.reduce((sum, record) => sum + toKilocalories(record.energy), 0);
};

const aggregateDistance = (records: DistanceRecord[]) =>
  records.reduce((sum, record) => sum + toKilometers(record.distance), 0);

const aggregateProtein = (records: NutritionRecord[]) =>
  records.reduce((sum, record) => sum + toGrams(record.protein), 0);

const aggregateNutritionCalories = (records: NutritionRecord[]) =>
  records.reduce((sum, record) => sum + toKilocalories(record.energy), 0);

const aggregateCardioMinutes = (records: ExerciseSessionRecord[]) =>
  records.reduce(
    (sum, record) => sum + diffMinutes(record.startTime, record.endTime),
    0
  );

const aggregateSleepMinutes = (records: SleepSessionRecord[]) => {
  const totals = {
    deep: 0,
    rem: 0,
    light: 0,
  };

  records.forEach((record) => {
    if (!record.stages?.length) {
      totals.light += diffMinutes(record.startTime, record.endTime);
      return;
    }

    record.stages.forEach((stage) => {
      const minutes = diffMinutes(stage.startTime, stage.endTime);
      switch (stage.stage) {
        case SleepStageType.DEEP:
          totals.deep += minutes;
          break;
        case SleepStageType.REM:
          totals.rem += minutes;
          break;
        case SleepStageType.LIGHT:
        case SleepStageType.SLEEPING:
          totals.light += minutes;
          break;
        default:
          break;
      }
    });
  });

  const total = totals.deep + totals.light + totals.rem;

  return {
    deep: totals.deep,
    light: totals.light || Math.max(0, total - totals.deep - totals.rem),
    rem: totals.rem,
    total,
  };
};

const calcSleepScore = (minutes: number) =>
  clamp(Math.round((minutes / 480) * 100));

const buildSegmentMetrics = (
  segment: SegmentOption,
  data: {
    steps: StepsRecord[];
    distances: DistanceRecord[];
    activeCalories: ActiveCaloriesBurnedRecord[];
    totalCalories: TotalCaloriesBurnedRecord[];
    cardio: ExerciseSessionRecord[];
    sleep: SleepSessionRecord[];
    nutrition: NutritionRecord[];
  }
): SegmentMetrics => {
  const steps = aggregateSteps(data.steps);
  const cardioMinutes = aggregateCardioMinutes(data.cardio);
  const sleepTotals = aggregateSleepMinutes(data.sleep);
  const sleepScore = calcSleepScore(sleepTotals.total || MINUTES_IN_DAY / 3);

  const nutritionCalories = aggregateNutritionCalories(data.nutrition);
  const protein = aggregateProtein(data.nutrition);

  return {
    activity: {
      steps,
      stepsGoal: ACTIVITY_GOALS[segment].steps,
      cardio: Math.round(cardioMinutes),
      cardioGoal: ACTIVITY_GOALS[segment].cardio,
      calories: Math.round(
        aggregateCalories([
          ...data.activeCalories,
          ...data.totalCalories,
        ])
      ),
      caloriesGoal:
        segment === "Daily"
          ? 500
          : segment === "Weekly"
            ? 3500
            : 15000,
      distance: Number(aggregateDistance(data.distances).toFixed(1)),
    },
    sleep: {
      sleepScore,
      totalSleep: formatMinutes(sleepTotals.total),
      deepSleep: formatMinutes(sleepTotals.deep),
      lightSleep: formatMinutes(sleepTotals.light),
      remSleep: formatMinutes(sleepTotals.rem),
    },
    nutrition: {
      calories: Math.round(nutritionCalories),
      goal: NUTRITION_GOALS.calories * SEGMENT_WINDOWS[segment],
      protein: Math.round(protein),
      proteinGoal: NUTRITION_GOALS.protein * SEGMENT_WINDOWS[segment],
    },
  };
};

const fetchRecordsForRange = async <
  T extends
    | StepsRecord
    | ActiveCaloriesBurnedRecord
    | TotalCaloriesBurnedRecord
    | ExerciseSessionRecord
    | SleepSessionRecord
    | DistanceRecord
    | NutritionRecord
    | HeartRateRecord
>(
  recordType: T["recordType"],
  range: Range
) => {
  const response = await readRecords(recordType, {
    timeRangeFilter: {
      operator: "between",
      startTime: range.startTime,
      endTime: range.endTime,
    },
    ascendingOrder: false,
    pageSize: 1000,
  });

  const normalizedRecords = response.records.map((record) => ({
    ...record,
    recordType,
  }));

  return normalizedRecords as unknown as T[];
};

const buildSummary = (
  segments: Record<SegmentOption, SegmentMetrics>,
  stress: StressMetrics
) => {
  const daily = segments.Daily || DEFAULT_SEGMENTS.Daily;

  const activityProgress = clamp(
    Math.round((daily.activity.steps / daily.activity.stepsGoal) * 100)
  );
  const nutritionProgress = clamp(
    Math.round((daily.nutrition.calories / daily.nutrition.goal) * 100)
  );

  const lifestyleScore = Math.round(
    (daily.sleep.sleepScore + activityProgress + nutritionProgress) / 3
  );

  const tiles: SummaryTile[] = [
    {
      title: "Sleep",
      score: daily.sleep.sleepScore,
      value: daily.sleep.totalSleep.replace(/\s/g, ""),
      icon: "moon-outline",
    },
    {
      title: "Nutrition",
      score: nutritionProgress,
      value: `${daily.nutrition.calories.toLocaleString()} Kcal`,
      icon: "restaurant-outline",
    },
    {
      title: "Activity",
      score: activityProgress,
      value: `${daily.activity.steps.toLocaleString()} Steps`,
      icon: "walk-outline",
    },
    {
      title: "Stress",
      score: clamp(stress.score),
      value: stress.level,
      icon: "headset-outline",
    },
  ];

  return {
    lifestyleScore,
    tiles,
  };
};

const getExerciseLabel = (exerciseType?: number) => {
  const mapping: Record<number, string> = {
    8: "Biking",
    9: "Stationary Bike",
    25: "Elliptical",
    36: "HIIT",
    37: "Hiking",
    48: "Pilates",
    49: "Plank",
    53: "Rowing",
    56: "Run",
    57: "Treadmill",
    70: "Strength Training",
    71: "Stretching",
    74: "Swim",
    79: "Walk",
    83: "Yoga",
  };

  return mapping[exerciseType ?? 0] ?? "Workout";
};

const fetchRecentWorkouts = async () => {
  try {
    const range = {
      startTime: dayjs().subtract(7, "day").startOf("day").toISOString(),
      endTime: dayjs().toISOString(),
    };

    const workouts = await fetchRecordsForRange<ExerciseSessionRecord>(
      "ExerciseSession",
      range
    );

    if (!workouts.length) {
      return DEFAULT_WORKOUTS;
    }

    return workouts.slice(0, 4).map((workout) => {
      const duration = Math.round(
        diffMinutes(workout.startTime, workout.endTime)
      );
      const status: WorkoutSummary["status"] = dayjs(workout.endTime).isBefore(
        dayjs()
      )
        ? "Completed"
        : "Upcoming";

      return {
        id: workout.metadata?.id ?? workout.startTime,
        title: workout.title || getExerciseLabel(workout.exerciseType),
        subtitle: `${duration} min${
          workout.exerciseType === 56 || workout.exerciseType === 79
            ? " • Cardio"
            : ""
        }`,
        durationMinutes: duration,
        distanceKm: undefined,
        startTime: workout.startTime,
        status,
      };
    });
  } catch (error) {
    return DEFAULT_WORKOUTS;
  }
};

const buildHeatmapData = async () => {
  try {
    const range = {
      startTime: dayjs().subtract(9, "day").startOf("day").toISOString(),
      endTime: dayjs().endOf("day").toISOString(),
    };

    const stepsRecords = await fetchRecordsForRange<StepsRecord>(
      "Steps",
      range
    );

    if (!stepsRecords.length) {
      return DEFAULT_HEATMAP;
    }

    const buckets: number[] = [];
    for (let i = 9; i >= 0; i -= 1) {
      const day = dayjs().subtract(i, "day");
      const total = stepsRecords
        .filter((record) => dayjs(record.endTime).isSame(day, "day"))
        .reduce((sum, record) => sum + (record.count || 0), 0);

      const normalized = clamp(
        Math.round((total / ACTIVITY_GOALS.Daily.steps) * 100)
      );
      buckets.push(normalized);
    }

    return buckets.map((value) => ({ value }));
  } catch (error) {
    return DEFAULT_HEATMAP;
  }
};

const buildStressMetrics = async (): Promise<StressMetrics> => {
  try {
    const range = {
      startTime: dayjs().subtract(3, "day").toISOString(),
      endTime: dayjs().toISOString(),
    };

    const heartRateRecords = await fetchRecordsForRange<HeartRateRecord>(
      "HeartRate",
      range
    );

    if (!heartRateRecords.length) {
      return DEFAULT_STRESS;
    }

    const averages: number[] = [];
    heartRateRecords.forEach((record) => {
      if (!record.samples?.length) return;
      const avg =
        record.samples.reduce(
          (sum, sample) => sum + (sample.beatsPerMinute || 0),
          0
        ) / record.samples.length;
      averages.push(avg);
    });

    if (!averages.length) {
      return DEFAULT_STRESS;
    }

    const lastThirteen = averages.slice(-13);
    const pattern = lastThirteen.map((avg) => ({
      value: clamp(Math.round(((avg - 45) / 60) * 100)),
    }));

    const totalAvg =
      averages.reduce((sum, value) => sum + value, 0) / averages.length;

    const level = totalAvg < 65 ? "Low" : totalAvg < 85 ? "Moderate" : "High";
    const loggedMinutes = clamp(
      Math.round(
        heartRateRecords.reduce(
          (sum, record) => sum + diffMinutes(record.startTime, record.endTime),
          0
        ) / 10
      ),
      0,
      DEFAULT_STRESS.goalMinutes
    );

    const score =
      level === "Low" ? 88 : level === "Moderate" ? 70 : Math.max(45, 55);

    return {
      pattern: pattern.length ? pattern : DEFAULT_STRESS.pattern,
      level,
      loggedMinutes,
      goalMinutes: DEFAULT_STRESS.goalMinutes,
      score,
    };
  } catch (error) {
    return DEFAULT_STRESS;
  }
};

export async function fetchHealthMetrics(): Promise<HealthMetrics> {
  const baseline: HealthMetrics = {
    ...DEFAULT_HEALTH_METRICS,
    segments: { ...DEFAULT_SEGMENTS },
    summary: { ...DEFAULT_HEALTH_METRICS.summary, tiles: [...DEFAULT_SUMMARY_TILES] },
    heatmap: [...DEFAULT_HEATMAP],
    workouts: [...DEFAULT_WORKOUTS],
    stress: { ...DEFAULT_STRESS },
    lastUpdated: dayjs().toISOString(),
  };

  try {
    const segments = await Promise.all(
      SEGMENT_OPTIONS.map(async (segment) => {
        const range = getRange(segment);

        const [
          steps,
          distances,
          activeCalories,
          totalCalories,
          cardio,
          sleep,
          nutrition,
        ] = await Promise.all([
          fetchRecordsForRange<StepsRecord>("Steps", range),
          fetchRecordsForRange<DistanceRecord>("Distance", range),
          fetchRecordsForRange<ActiveCaloriesBurnedRecord>(
            "ActiveCaloriesBurned",
            range
          ),
          fetchRecordsForRange<TotalCaloriesBurnedRecord>(
            "TotalCaloriesBurned",
            range
          ),
          fetchRecordsForRange<ExerciseSessionRecord>("ExerciseSession", range),
          fetchRecordsForRange<SleepSessionRecord>("SleepSession", range),
          fetchRecordsForRange<NutritionRecord>("Nutrition", range),
        ]);

        return buildSegmentMetrics(segment, {
          steps,
          distances,
          activeCalories,
          totalCalories,
          cardio,
          sleep,
          nutrition,
        });
      })
    );

    const segmentMap: Record<SegmentOption, SegmentMetrics> = {
      Daily: segments[0],
      Weekly: segments[1],
      Monthly: segments[2],
    };

    const [heatmap, workouts, stress] = await Promise.all([
      buildHeatmapData(),
      fetchRecentWorkouts(),
      buildStressMetrics(),
    ]);

    const summary = buildSummary(segmentMap, stress);

    return {
      segments: segmentMap,
      heatmap,
      workouts,
      stress,
      summary,
      lastUpdated: dayjs().toISOString(),
    };
  } catch (error) {
    console.warn("Failed to fetch health metrics, falling back to defaults", error);
    return baseline;
  }
}

