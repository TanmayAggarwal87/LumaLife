import { Platform } from "react-native";
import {
  getGrantedPermissions,
  getSdkStatus,
  initialize,
  Permission,
  requestPermission,
  SdkAvailabilityStatus,
} from "react-native-health-connect";

const HEALTH_PERMISSIONS: Permission[] = [
  { accessType: "read", recordType: "Steps" },
  { accessType: "read", recordType: "Distance" },
  { accessType: "read", recordType: "ActiveCaloriesBurned" },
  { accessType: "read", recordType: "TotalCaloriesBurned" },
  { accessType: "read", recordType: "HeartRate" },
  { accessType: "read", recordType: "RestingHeartRate" },
  { accessType: "read", recordType: "SleepSession" },
  { accessType: "read", recordType: "ExerciseSession" },
  { accessType: "read", recordType: "Nutrition" },
];

export type PermissionStatus = {
  granted: boolean;
  reason?: string;
};

function missingPermissions(
  granted: (Permission | { recordType: string; accessType: string })[]
) {
  const grantedKey = new Set(
    granted
      .map((item) => `${item.recordType}:${item.accessType}`)
      .filter(Boolean)
  );

  return HEALTH_PERMISSIONS.filter(
    (permission) =>
      !grantedKey.has(`${permission.recordType}:${permission.accessType}`)
  );
}

export async function requestHealthPermissions(): Promise<PermissionStatus> {
  if (Platform.OS !== "android") {
    return {
      granted: false,
      reason: "Health Connect is currently available on Android devices only.",
    };
  }

  const status = await getSdkStatus().catch(() => null);

  if (!status || status === SdkAvailabilityStatus.SDK_UNAVAILABLE) {
    return {
      granted: false,
      reason:
        "Health Connect is not installed on this device. Install or update it from the Play Store.",
    };
  }

  if (status === SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED) {
    return {
      granted: false,
      reason: "Health Connect needs to be updated before proceeding.",
    };
  }

  await initialize();

  const alreadyGranted = await getGrantedPermissions().catch(() => []);
  const outstanding = missingPermissions(alreadyGranted);

  if (!outstanding.length) {
    return { granted: true };
  }

  const result = await requestPermission(HEALTH_PERMISSIONS).catch(() => []);
  const stillMissing = missingPermissions(result);

  return stillMissing.length === 0
    ? { granted: true }
    : {
        granted: false,
        reason:
          "Health Connect permissions were denied. Enable them from system settings to sync health data.",
      };
}

