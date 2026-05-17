import theme from "@/app/theme/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";

const AttendanceTopUI = ({
  memberInsideCount,
  checkedInCount,
}: {
  memberInsideCount: number;
  checkedInCount: number;
}) => {
  const renderCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  return (
    <View style={{ gap: 16 }}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.screenSub}>
            Check-in, check-out &amp; workout duration
          </Text>
        </View>
        <View style={styles.timeBadge}>
          <IconSymbol name="clock" size={15} color={theme.colors.primary} />
          <View>
            <Text style={styles.timeBadgeLabel}>{"CURRENT\nTIME"}</Text>
            <Text style={styles.timeBadgeValue}>{renderCurrentTime()}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statCount}>{memberInsideCount}</Text>
          <Text style={styles.statLabel}>MEMBERS INSIDE</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statCount}>{checkedInCount}</Text>
          <Text style={styles.statLabel}>CHECKED IN TODAY</Text>
        </View>
      </View>
    </View>
  );
};

export default AttendanceTopUI;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  headerLeft: {
    flex: 1,
    gap: 4,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  screenSub: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 17,
  },
  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexShrink: 0,
  },
  timeBadgeLabel: {
    fontSize: 9,
    fontWeight: "600",
    color: "#6b7280",
    letterSpacing: 0.5,
    lineHeight: 13,
  },
  timeBadgeValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    paddingVertical: 20,
    alignItems: "center",
    gap: 6,
  },
  statCount: {
    fontSize: 40,
    fontWeight: "700",
    color: theme.colors.primary,
    lineHeight: 46,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#6b7280",
    letterSpacing: 0.6,
    textAlign: "center",
  },
});
