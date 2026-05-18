import theme from "@/app/theme/theme";
import { RecentPayment } from "@/types/dashboart";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";
import { RecentPaymentItem } from "./RecentPaymentItem";
const DEFAULT_PAYMENTS: RecentPayment[] = [
  {
    id: "1",
    name: "Rahul Kumar",
    initials: "RK",
    avatarBg: "#eeedfe",
    avatarColor: "#4f46e5",
    method: "UPI",
    date: "14 May",
    amount: 2499,
    status: "Paid",
  },
  {
    id: "2",
    name: "Priya Sharma",
    initials: "PS",
    avatarBg: "#e1f5ee",
    avatarColor: "#0f6e56",
    method: "Cash",
    date: "14 May",
    amount: 1299,
    status: "Paid",
  },
  {
    id: "3",
    name: "Rohit Verma",
    initials: "RV",
    avatarBg: "#faeeda",
    avatarColor: "#854f0b",
    method: "UPI",
    date: "13 May",
    amount: 2499,
    status: "Pending",
  },
  {
    id: "4",
    name: "Sneha Gupta",
    initials: "SG",
    avatarBg: "#e6f1fb",
    avatarColor: "#185fa5",
    method: "Card",
    date: "13 May",
    amount: 999,
    status: "Paid",
  },
  {
    id: "5",
    name: "Aryan Mehta",
    initials: "AM",
    avatarBg: "#fbeaf0",
    avatarColor: "#993556",
    method: "UPI",
    date: "12 May",
    amount: 2499,
    status: "Paid",
  },
];
const RecentPayments = () => {
  const onViewAllPayments = () => {
    router.push("/(tabs)/payments");
  };
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>Recent payments</Text>
          <Text style={styles.cardSub}>
            Last {DEFAULT_PAYMENTS.length} transactions
          </Text>
        </View>
      </View>

      {DEFAULT_PAYMENTS.map((p, i) => (
        <RecentPaymentItem
          key={p.id}
          item={p}
          isLast={i === DEFAULT_PAYMENTS.length - 1}
        />
      ))}

      <TouchableOpacity
        style={styles.viewAllBtn}
        onPress={onViewAllPayments}
        activeOpacity={0.75}
      >
        <Text style={styles.viewAllText}>View all payments</Text>
        <IconSymbol name="arrow.right" size={14} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default RecentPayments;

const styles = StyleSheet.create({
  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    padding: 14,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  cardSub: {
    fontSize: 12,
    color: "#6b7280",
  },

  // View all
  viewAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: "500",
    color: theme.colors.primary,
  },
});
