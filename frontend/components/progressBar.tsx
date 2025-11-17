import { Text, View } from 'react-native'

export default function ProgressBar({ progress = 0 }) {
  return (
    <View className="w-28 flex justify-center items-center flex-row gap-2">
      <View className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
        <View
          className="h-full bg-blue-600"
          style={{ width: `${progress}%` }}
        />
      </View>
      <Text className=" text-white text-center font-semibold text-md">
        {progress}%
      </Text>
    </View>
  )
}
