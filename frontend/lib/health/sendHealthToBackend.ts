import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import type { HealthMetrics } from "./healthFetch";

const STORAGE_KEY = "@lumalife-health-sync-queue";
const MAX_QUEUE_ENTRIES = 5;

const API_BASE =
  process.env.EXPO_PUBLIC_API_URL ||
  process.env.EXPO_PUBLIC_BACKEND_URL ||
  "http://10.0.2.2:3000";

type SyncPayload = {
  id: string;
  userId: string;
  timestamp: string;
  metrics: HealthMetrics;
};

export type SyncResponse =
  | { status: "success"; message: string }
  | { status: "queued"; message: string }
  | { status: "error"; message: string };

const readQueue = async (): Promise<SyncPayload[]> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SyncPayload[]) : [];
  } catch {
    return [];
  }
};

const writeQueue = async (queue: SyncPayload[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
};

const enqueue = async (payload: SyncPayload) => {
  const queue = await readQueue();
  queue.push(payload);

  while (queue.length > MAX_QUEUE_ENTRIES) {
    queue.shift();
  }

  await writeQueue(queue);
};

const postPayload = async (payload: SyncPayload) => {
  const response = await fetch(`${API_BASE}/api/health/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: payload.userId,
      metrics: payload.metrics,
      timestamp: payload.timestamp,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Upload failed");
  }

  return response.json();
};

const flushQueue = async () => {
  const queue = await readQueue();
  if (!queue.length) return;

  const online = await NetInfo.fetch().then((state) => state.isConnected);
  if (!online) return;

  const remaining: SyncPayload[] = [];

  for (const entry of queue) {
    try {
      await postPayload(entry);
    } catch (error) {
      remaining.push(entry);
    }
  }

  await writeQueue(remaining);
};

export const sendHealthToBackend = async (
  metrics: HealthMetrics,
  userId: string
): Promise<SyncResponse> => {
  if (!userId) {
    return {
      status: "error",
      message: "A valid userId is required to sync data.",
    };
  }

  const payload: SyncPayload = {
    id: `${userId}-${Date.now()}`,
    userId,
    metrics,
    timestamp: new Date().toISOString(),
  };

  const isConnected = await NetInfo.fetch().then((state) => state.isConnected);

  if (!isConnected) {
    await enqueue(payload);
    return {
      status: "queued",
      message: "Device offline. Health data saved locally and will retry later.",
    };
  }

  try {
    await flushQueue();
    await postPayload(payload);
    return {
      status: "success",
      message: "Health data synced successfully.",
    };
  } catch (error) {
    await enqueue(payload);
    return {
      status: "queued",
      message:
        error instanceof Error
          ? error.message
          : "Unable to reach backend. Data queued locally.",
    };
  }
};

export const retryQueuedHealthSync = async () => {
  await flushQueue();
};

