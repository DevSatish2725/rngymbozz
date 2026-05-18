import { PAYMENT_STATUS_CONFIG } from "@/constants/dashboard";
import { RecentPayment } from "@/types/dashboart";
import { StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";

export function RecentPaymentItem({
      item,
      isLast,
    }: {
      item: RecentPayment;
      isLast: boolean;
    }) {
      const s = PAYMENT_STATUS_CONFIG[item.status];
  return (
        <View style={[styles.paymentRow, !isLast && styles.paymentRowBorder]}>
          <View style={[styles.payAvatar, { backgroundColor: item.avatarBg }]}>
            <Text style={[styles.payAvatarText, { color: item.avatarColor }]}>
              {item.initials}
            </Text>
          </View>
          <View style={styles.payInfo}>
            <Text style={styles.payName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.payMeta}>{item.method} · {item.date}</Text>
          </View>
          <View style={styles.payRight}>
            <Text style={styles.payAmount}>
              ₹{item.amount.toLocaleString("en-IN")}
            </Text>
            <View style={[styles.payBadge, { backgroundColor: s.bg }]}>
              <IconSymbol name={s.icon} size={10} color={s.color} />
              <Text style={[styles.payBadgeText, { color: s.color }]}>
                {item.status}
              </Text>
            </View>
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
  // Payment rows
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  paymentRowBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#f3f4f6",
  },
  payAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  payAvatarText: {
    fontSize: 12,
    fontWeight: "700",
  },
  payInfo: {
    flex: 1,
    gap: 2,
  },
  payName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  payMeta: {
    fontSize: 11,
    color: "#6b7280",
  },
  payRight: {
    alignItems: "flex-end",
    gap: 4,
    flexShrink: 0,
  },
  payAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  payBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  payBadgeText: {
    fontSize: 10,
    fontWeight: "600",
  },
});
