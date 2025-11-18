import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import clsx from "clsx";

// Exact allowed options
export type SegmentOption = "Daily" | "Weekly" | "Monthly";

interface Props {
  selected: SegmentOption;
  onChange: (value: SegmentOption) => void;
  className?: string;
  pillClassName?: string;
}

const OPTIONS: SegmentOption[] = ["Daily", "Weekly", "Monthly"];

export default function SegmentedControl({
  selected,
  onChange,
  className = "",
  pillClassName = "",
}: Props) {
  return (
    <View
      className={clsx(
        "flex flex-row items-center w-full bg-slate-800 rounded-full p-1 overflow-hidden h-12",
        className
      )}
    >
      {OPTIONS.map((option) => {
        const isActive = selected === option;

        return (
          <TouchableOpacity
            key={option}
            onPress={() => onChange(option)}
            className="flex-1"
          >
            <View
              className={clsx(
                "h-10 rounded-full items-center justify-center",
                isActive ? "bg-blue-500" : "bg-transparent",
                pillClassName
              )}
            >
              <Text
                className={clsx(
                  "text-md font-semibold",
                  isActive ? "text-white" : "text-gray-400"
                )}
              >
                {option}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
