import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";

interface ShimmerBoxProps {
  translateX: Animated.Value;
  width: number;
  style?: ViewStyle;
}
export default function ShimmerBox({
  translateX,
  width,
  style,
}: ShimmerBoxProps) {
  return (
    <View style={[{ backgroundColor: "#ececec", overflow: "hidden" }, style]}>
      <Animated.View
        style={[StyleSheet.absoluteFillObject, { transform: [{ translateX }] }]}
      >
        <LinearGradient
          colors={["transparent", "rgba(149, 149, 149, 0.55)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFillObject, { width: width * 0.6 }]}
        />
      </Animated.View>
    </View>
  );
}