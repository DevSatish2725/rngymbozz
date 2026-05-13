import ShimmerBox from "@/components/ui/ShimmerBox";
import React from "react";
import { Animated, StyleSheet, View } from "react-native";

interface ShimmerCardProps {
  translateX: Animated.Value;
  screenWidth: number;
}
export default function ShimmerCard({
  translateX,
  screenWidth,
}: ShimmerCardProps) {
  const contentWidth = screenWidth - 32; // Adjust as needed
  return (
    <View style={styles.card}>
      <ShimmerBox
        translateX={translateX}
        width={contentWidth}
        style={{ width: 44, height: 44, borderRadius: 22, flexShrink: 0 }}
      />
      <View style={styles.textBlock}>
        <View style={{ gap: 6, flex: 1 }}>
          <ShimmerBox
            translateX={translateX}
            width={contentWidth * 0.6}
            style={{ width: 80, height: 20, borderRadius: 12, flexShrink: 0 }}
          />
          <ShimmerBox
            translateX={translateX}
            width={contentWidth * 0.4}
            style={{ width: 100, height: 18, borderRadius: 12, flexShrink: 0 }}
          />
          <ShimmerBox
            translateX={translateX}
            width={contentWidth * 0.5}
            style={{ width: 120, height: 20, borderRadius: 12, flexShrink: 0 }}
          />
        </View>
        <ShimmerBox
          translateX={translateX}
          width={contentWidth * 0.3}
          style={{ width: 80, height: 20, borderRadius: 12, flexShrink: 0 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#909090",
  },
  textBlock: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
