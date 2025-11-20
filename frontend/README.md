# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

## Health Connect + Backend Sync

This project now reads from Android Health Connect (no Google Fit or HealthKit) and syncs real metrics to the backend for AI analysis.

### 1. Install native modules

```bash
npm install expo-health-connect react-native-health-connect \
  @react-native-async-storage/async-storage \
  @react-native-community/netinfo dayjs
```

### 2. Configure `app.json`

- `expo-health-connect` plugin is already registered.
- Android `permissions` now include `android.permission.health.READ_HEALTH_DATA`.
- `expo-build-properties` pins the SDK levels required by Health Connect.

Rebuild after config changes:

```bash
eas build --profile development --platform android
```

Or, for a local dev client:

```bash
npx expo prebuild --clean
npx expo run:android
```

### 3. Environment variables

Copy `env.example` to `.env` (or set EAS secrets) and fill in your values:

```bash
cp env.example .env
```

Required keys:

- `EXPO_PUBLIC_API_URL` – HTTPS endpoint that the app should call in prod.
- `EXPO_PUBLIC_USER_ID` – the user/account id you want to tag uploads with.
- Optional: `EXPO_PUBLIC_BACKEND_URL` if you need a different local dev host.

### 4. Health data layer

- `lib/health/healthPermissions.ts` checks/requests Health Connect scopes.
- `lib/health/healthFetch.ts` reads steps, sleep, workouts, nutrition, heart rate, etc., then normalizes everything into the exact shapes expected by the UI.
- `lib/health/useHealthData.ts` is the hook that every page uses. It requests permissions, fetches metrics on mount, exposes `refresh`, and exposes `syncHealthData()` for the manual sync button.

### 5. Sync trigger

The home tab header now contains a small cloud icon. Tapping it:

1. Re-reads Health Connect data.
2. Updates all screen state.
3. Sends the standardized payload plus `userId` to `/api/health/upload`.
4. Falls back to local queueing (AsyncStorage) if offline.

You can drop the same handler anywhere else if you need more sync affordances.

-- made bu docify --