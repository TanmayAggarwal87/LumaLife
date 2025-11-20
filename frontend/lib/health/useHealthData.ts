import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { openHealthConnectSettings } from "react-native-health-connect";

import {
  DEFAULT_HEALTH_METRICS,
  fetchHealthMetrics,
  type HealthMetrics,
} from "./healthFetch";
import { requestHealthPermissions } from "./healthPermissions";
import {
  retryQueuedHealthSync,
  sendHealthToBackend,
  type SyncResponse,
} from "./sendHealthToBackend";

type Options = {
  userId?: string;
};

export type UseHealthDataResult = {
  loading: boolean;
  syncing: boolean;
  error: string | null;
  metrics: HealthMetrics;
  lastSyncedAt: string | null;
  refresh: () => Promise<void>;
  syncHealthData: () => Promise<SyncResponse>;
};

export const useHealthData = (options: Options = {}): UseHealthDataResult => {
  const { userId } = options;

  const [metrics, setMetrics] = useState<HealthMetrics>(DEFAULT_HEALTH_METRICS);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  const pullMetrics = useCallback(
    async (opts?: { silent?: boolean }) => {
      if (!opts?.silent) {
        setLoading(true);
      }

      try {
        const permissions = await requestHealthPermissions();
        if (!permissions.granted) {
          const message =
            permissions.reason ||
            "Health Connect permissions are required to fetch metrics.";

          Alert.alert(
            "Health Connect access needed",
            message,
            [
              {
                text: "Open Settings",
                onPress: () => openHealthConnectSettings(),
              },
              { text: "Not now", style: "cancel" },
            ],
            { cancelable: true }
          );

          throw new Error(message);
        }

        const data = await fetchHealthMetrics();
        setMetrics(data);
        setLastSyncedAt(data.lastUpdated);
        setError(null);
        return data;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Unable to read data from Health Connect.";
        setError(message);
        return null;
      } finally {
        if (!opts?.silent) {
          setLoading(false);
        }
      }
    },
    []
  );

  const refresh = useCallback(async () => {
    await pullMetrics();
  }, [pullMetrics]);

  const syncHealthData = useCallback(async () => {
    setSyncing(true);
    try {
      const latest = await pullMetrics({ silent: true });

      if (!latest) {
        return {
          status: "error",
          message: "Unable to refresh metrics prior to syncing.",
        } as SyncResponse;
      }

      if (!userId) {
        throw new Error(
          "A userId is required to send health data to the backend."
        );
      }

      const response = await sendHealthToBackend(latest, userId);
      return response;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong while syncing health data.";
      setError(message);
      return {
        status: "error",
        message,
      } as SyncResponse;
    } finally {
      setSyncing(false);
    }
  }, [pullMetrics, userId]);

  useEffect(() => {
    retryQueuedHealthSync().catch(() => undefined);
    refresh();
  }, [refresh]);

  return useMemo(
    () => ({
      loading,
      syncing,
      error,
      metrics,
      lastSyncedAt,
      refresh,
      syncHealthData,
    }),
    [loading, syncing, error, metrics, lastSyncedAt, refresh, syncHealthData]
  );
};

