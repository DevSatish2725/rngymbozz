import theme from "@/app/theme/theme";
import { SEGMENTS } from "@/constants/attendance";
import { AttendanceSegment } from "@/types/attendance";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AttendanceSegmentControl = ({
  activeSegment,
  onSegmentChange,
}: {
  activeSegment: AttendanceSegment;
  onSegmentChange: (segment: AttendanceSegment) => void;
}) => {
  return (
    <View style={styles.toggleRow}>
      {SEGMENTS.map((s) => (
        <TouchableOpacity
          key={s.key}
          style={[
            styles.toggleBtn,
            activeSegment === s.key && styles.toggleBtnActive,
          ]}
          onPress={() => onSegmentChange(s.key as AttendanceSegment)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.toggleBtnText,
              activeSegment === s.key && styles.toggleBtnTextActive,
            ]}
          >
            {s.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AttendanceSegmentControl;

const styles = StyleSheet.create({
  toggleRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 3,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    marginBottom: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 30,
    alignItems: "center",
  },
  toggleBtnActive: {
    backgroundColor: theme.colors.primary,
  },
  toggleBtnText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
  },
  toggleBtnTextActive: {
    color: "#fff",
  },
});
