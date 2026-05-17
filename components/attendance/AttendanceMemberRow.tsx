import { AVATAR_COLORS, AVATAR_TEXT_COLORS } from "@/constants/attendance";
import { AttendanceMember } from "@/types/attendance";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AttendanceMemberRow = ({
  member,
  showBoderBottom,
  index,
  onCheckIn,
  onCheckOut,
}: {
  member: AttendanceMember;
  index: number;
  showBoderBottom: boolean;
  onCheckIn?: (m: AttendanceMember) => void;
  onCheckOut?: (m: AttendanceMember) => void;
}) => {
  const isCheckIn = member.action === "check-in";
  const getAvatarColor = (i: number) => AVATAR_COLORS[i % AVATAR_COLORS.length];
  const getAvatarTextColor = (i: number) =>
    AVATAR_TEXT_COLORS[i % AVATAR_TEXT_COLORS.length];
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  return (
    <View>
      <View style={styles.memberRow}>
        <View
          style={[styles.avatar, { backgroundColor: getAvatarColor(index) }]}
        >
          <Text
            style={[styles.avatarText, { color: getAvatarTextColor(index) }]}
          >
            {getInitials(member.name)}
          </Text>
        </View>
        <View style={styles.memberInfo}>
          <Text style={styles.memberName} numberOfLines={1}>
            {member.name}
          </Text>
          <Text style={styles.memberPlan}>{member.plan}</Text>
        </View>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() =>
            isCheckIn ? onCheckIn?.(member) : onCheckOut?.(member)
          }
          activeOpacity={0.75}
        >
          <Text style={styles.actionBtnText}>
            {isCheckIn ? "Check in" : "Check out"}
          </Text>
        </TouchableOpacity>
      </View>
      {showBoderBottom ? <View style={styles.memberDivider}></View> : null}
    </View>
  );
};

export default AttendanceMemberRow;

const styles = StyleSheet.create({
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  memberDivider: {
    height: 0.5,
    backgroundColor: "#f3f4f6",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  avatarText: {
    fontSize: 13,
    fontWeight: "700",
  },
  memberInfo: {
    flex: 1,
    gap: 2,
  },
  memberName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  memberPlan: {
    fontSize: 12,
    color: "#6b7280",
  },
  actionBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#fff",
    flexShrink: 0,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
});
