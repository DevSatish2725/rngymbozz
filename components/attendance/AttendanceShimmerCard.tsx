import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import ShimmerBox from "../ui/ShimmerBox";

interface ShimmerCardProps {
  translateX: Animated.Value;
  screenWidth: number;
}
const AttendanceShimmerCard = ({
  translateX,
  screenWidth,
}: ShimmerCardProps) => {
  return (
    <View style={styles.card}>
      <ShimmerBox
        translateX={translateX}
        width={screenWidth}
        style={{ width: 44, height: 44, borderRadius: 22, flexShrink: 0 }}
      />
      <View style={styles.textBlock}>
        <View style={{ gap: 12 }}>
          <ShimmerBox
            translateX={translateX}
            width={screenWidth * 0.6}
            style={{ width: 80, height: 20, borderRadius: 12, flexShrink: 0 }}
          />
          <ShimmerBox
            translateX={translateX}
            width={screenWidth * 0.4}
            style={{ width: 100, height: 18, borderRadius: 12, flexShrink: 0 }}
          />
        </View>
        <ShimmerBox
          translateX={translateX}
          width={screenWidth * 0.6}
          style={{ width: 80, height: 40, borderRadius: 12, flexShrink: 0 }}
        />
      </View>
    </View>
  );
};

export default AttendanceShimmerCard;

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
