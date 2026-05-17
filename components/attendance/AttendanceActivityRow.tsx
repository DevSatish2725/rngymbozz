import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RecentActivity } from '@/types/attendance';

const AttendanceActivityRow = ({
      item,
      isLast,
    }: {
      item: RecentActivity;
      isLast: boolean;
    }) => {
    const isCheckIn = item.action === "check-in";
  return (
        <View style={[styles.activityRow, !isLast && styles.activityRowBorder]}>
          <View
            style={[
              styles.activityDot,
              { backgroundColor: isCheckIn ? "#16a34a" : "#9ca3af" },
            ]}
          />
          <View style={styles.activityInfo}>
            <Text style={styles.activityName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.activityTime}>{item.time}</Text>
          </View>
          <View
            style={[
              styles.activityBadge,
              { backgroundColor: isCheckIn ? "#dcfce7" : "#f3f4f6" },
            ]}
          >
            <Text
              style={[
                styles.activityBadgeText,
                { color: isCheckIn ? "#16a34a" : "#6b7280" },
              ]}
            >
              {isCheckIn ? "Checked in" : "Checked out"}
            </Text>
          </View>
        </View>
  )
}

export default AttendanceActivityRow

const styles = StyleSheet.create({
    activityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 11,
  },
  activityRowBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#f3f4f6",
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    flexShrink: 0,
  },
  activityInfo: {
    flex: 1,
    gap: 2,
  },
  activityName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  activityTime: {
    fontSize: 11,
    color: "#6b7280",
  },
  activityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    flexShrink: 0,
  },
  activityBadgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  // Recent activity
  recentTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6b7280",
    letterSpacing: 0.8,
  },

  // Empty
  emptyState: {
    paddingVertical: 28,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#9ca3af",
    fontStyle: "italic",
  },
})