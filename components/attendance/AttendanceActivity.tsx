import { RecentActivity } from "@/types/attendance";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AttendanceActivityRow from "./AttendanceActivityRow";

const AttendanceActivity = ({
  recentActivity,
}: {
  recentActivity: RecentActivity[];
  }) => {
  return (
    <View style={[styles.card, {flex: 1}]}>
      <Text style={styles.recentTitle}>RECENT ACTIVITY</Text>
      {recentActivity.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No recent activity</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlashList
            data={recentActivity}
            renderItem={({ item, index }) => (
              <AttendanceActivityRow
                key={item.id}
                item={item}
                isLast={index === recentActivity.length - 1}
              />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default AttendanceActivity;

const styles = StyleSheet.create({
  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    padding: 14,
    gap: 10,
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
});
