import { AttendanceMember } from "@/types/attendance";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";
import AttendanceMemberRow from "./AttendanceMemberRow";
import AttendanceSearch from "./AttendanceSearch";

const AttendanceCheckIn = ({
  searchQuery,
  onSearchChange,
  members,
  onCheckIn,
  onCheckOut,
}: {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  members: AttendanceMember[];
  onCheckIn: (member: AttendanceMember) => void;
  onCheckOut: (member: AttendanceMember) => void;
}) => {
  return (
    <View style={[styles.card, { flex: 1 }]}>
      <View style={styles.checkInTitleRow}>
        <IconSymbol name="bolt.fill" size={16} color="#f59e0b" />
        <Text style={styles.checkInTitle}>Quick Check-In</Text>
      </View>
      <AttendanceSearch
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
      {members.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No active members found</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlashList
            data={members}
            renderItem={({ item, index }) => (
              <AttendanceMemberRow
                member={item}
                index={index}
                showBoderBottom={index < members.length - 1 ? true : false}
                onCheckIn={onCheckIn}
                onCheckOut={onCheckOut}
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

export default AttendanceCheckIn;

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

  // Check-in title
  checkInTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  checkInTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
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
