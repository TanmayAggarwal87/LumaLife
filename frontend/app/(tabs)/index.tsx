import ProgressBar from "@/components/progressBar";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Tabs, useRouter } from "expo-router";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useHealthData } from "@/lib/health/useHealthData";
import robo from "../../assets/images/robo_final.png";

const USER_ID =
  process.env.EXPO_PUBLIC_USER_ID || process.env.EXPO_PUBLIC_DEFAULT_USER_ID || "demo-user-001";

export default function Index() {
  const router = useRouter();
  const {
    metrics,
    loading,
    error,
    syncHealthData,
    syncing,
    lastSyncedAt,
  } = useHealthData({ userId: USER_ID });

  return (
    // need to add pulsing
    <ScrollView className="bg-slate-900 h-full w-full px-4 ">
      <Tabs.Screen
        options={{
          title: "LumaLife",
          headerRight: () => (
            <View className="flex-row items-center gap-3 pr-2">
              <TouchableOpacity
                accessibilityLabel="Sync Health Data"
                onPress={syncHealthData}
                disabled={syncing}
                className="bg-slate-800 rounded-full p-2"
              >
                <Ionicons
                  name={syncing ? "sync" : "cloud-upload-outline"}
                  size={20}
                  color={syncing ? "#60A5FA" : "white"}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="settings-outline" size={20} color={"white"} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <View className="flex justify-center items-center flex-col mt-6">
        <View className="flex justify-center items-center flex-col">
          <View>
            <Text className="text-white text-3xl font-bold tracking-wider">
              Your Lifestyle Score
            </Text>
          </View>
          <View>
            <Text className="text-gray-600 text-lg font-semibold">
              {metrics.summary.lifestyleScore}/100
            </Text>
          </View>
        </View>
        <View>
          <View className="z-0 bg-blue-900/10 rounded-full p-6 mt-8">
            <View className="bg-black rounded-full h-fit w-fit p-0  z-5">
              <Image source={robo} className="h-[250px] w-[250px]" />
            </View>
          </View>
        </View>
      </View>

      <View>
        {error ? (
          <Text className="text-red-400 text-xs text-center">{error}</Text>
        ) : null}
        {loading ? (
          <Text className="text-gray-400 text-xs text-center mt-1">
            Syncing live metrics...
          </Text>
        ) : null}
        <View>
          <Text className="text-white text-3xl font-bold mt-6">
            {" "}
            Daily Progress
          </Text>
          {lastSyncedAt ? (
            <Text className="text-gray-500 text-xs mt-1">
              Updated {dayjs(lastSyncedAt).format("MMM D, h:mm A")}
            </Text>
          ) : null}
        </View>
        <View className="mb-10">
          <FlatList
            data={metrics.summary.tiles}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex justify-between items-center flex-row mt-4 bg-neutral-900/70 rounded-xl px-3 py-4"
                onPress={() =>
                  router.navigate(`/(pages)/${item.title.toLocaleLowerCase()}`)
                }
              >
                <View className="flex justify-between items-center flex-row gap-4">
                  <View className="p-2 bg-blue-950/50 rounded-xl">
                    <Ionicons name={item.icon as any} size={30} color={"blue"} />
                  </View>
                  <View>
                    <Text className="text-white text-xl font-semibold tracking-wider">
                      {item.title}
                    </Text>
                    <Text className="text-gray-600 text-lg font-semibold">
                      {item.value}
                    </Text>
                  </View>
                </View>

                <View className="absolute right-6">
                  <ProgressBar progress={item.score} />
                </View>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
      </View>
    </ScrollView>
  );
}
