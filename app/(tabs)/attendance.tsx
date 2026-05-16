import theme from "@/app/theme/theme";
import AppHeader from "@/components/AppHeader";
import { ScreenHeader } from "@/components/ScreenHeader";
import AttendanceSearch from "@/components/attendance/AttendanceSearch";
import AttendanceTopUI from "@/components/attendance/AttendanceTopUI";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ─── Types ────────────────────────────────────────────────────────────────────

export type MemberAction = "check-in" | "check-out";

export interface AttendanceMember {
  id: string;
  name: string;
  plan: string;
  action: MemberAction;
}

export interface RecentActivity {
  id: string;
  memberName: string;
  action: MemberAction;
  time: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const AVATAR_COLORS = ["#faeeda", "#eeedfe", "#dcfce7", "#e0f2fe", "#fce7f3"];
const AVATAR_TEXT_COLORS = [
  "#854f0b",
  "#4f46e5",
  "#16a34a",
  "#0284c7",
  "#be185d",
];
const getAvatarColor = (i: number) => AVATAR_COLORS[i % AVATAR_COLORS.length];
const getAvatarTextColor = (i: number) =>
  AVATAR_TEXT_COLORS[i % AVATAR_TEXT_COLORS.length];

// ─── Sub-components ───────────────────────────────────────────────────────────

const MemberRow = ({
  member,
  index,
  onCheckIn,
  onCheckOut,
}: {
  member: AttendanceMember;
  index: number;
  onCheckIn?: (m: AttendanceMember) => void;
  onCheckOut?: (m: AttendanceMember) => void;
}) => {
  const isCheckIn = member.action === "check-in";
  return (
    <View style={styles.memberRow}>
      <View style={[styles.avatar, { backgroundColor: getAvatarColor(index) }]}>
        <Text style={[styles.avatarText, { color: getAvatarTextColor(index) }]}>
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
        onPress={() => (isCheckIn ? onCheckIn?.(member) : onCheckOut?.(member))}
        activeOpacity={0.75}
      >
        <Text style={styles.actionBtnText}>
          {isCheckIn ? "Check in" : "Check out"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ActivityRow = ({
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
          {item.memberName}
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
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function AttendanceDeskScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState<AttendanceMember[]>([
    { id: "1", name: "John Doe", plan: "Premium Plan", action: "check-in" },
  ]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    { id: "1", memberName: "John Doe", action: "check-in", time: "10:45 AM" },
  ]);

  const onSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const onCheckIn = (member: AttendanceMember) => {
    // Implement check-in logic here
    console.log("Check in:", member);
  };

  const onCheckOut = (member: AttendanceMember) => {
    // Implement check-out logic here
    console.log("Check out:", member);
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <AppHeader />
      <ScreenHeader screenName="Attendance" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Header ── */}
        <AttendanceTopUI />

        {/* ── Quick Check-In card ── */}
        <View style={styles.card}>
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
            <View>
              {members.map((member, index) => (
                <View key={member.id}>
                  <MemberRow
                    member={member}
                    index={index}
                    onCheckIn={onCheckIn}
                    onCheckOut={onCheckOut}
                  />
                  {index < members.length - 1 && (
                    <View style={styles.memberDivider} />
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* ── Stats row ── */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statCount}>{0}</Text>
            <Text style={styles.statLabel}>MEMBERS INSIDE</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statCount}>{0}</Text>
            <Text style={styles.statLabel}>CHECKED IN TODAY</Text>
          </View>
        </View>

        {/* ── Recent activity card ── */}
        <View style={styles.card}>
          <Text style={styles.recentTitle}>RECENT ACTIVITY</Text>
          {recentActivity.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No recent activity</Text>
            </View>
          ) : (
            recentActivity.map((item, index) => (
              <ActivityRow
                key={item.id}
                item={item}
                isLast={index === recentActivity.length - 1}
              />
            ))
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  scroll: {
    padding: 16,
    gap: 12,
  },

  // Header
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

  // Search
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
    paddingVertical: 0,
  },

  // Member rows
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

  // Stats
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

  // Recent activity
  recentTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6b7280",
    letterSpacing: 0.8,
  },
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
