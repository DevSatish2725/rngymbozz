import { IconSymbol } from "@/components/ui/icon-symbol";
import { METHOD_CONFIG, STATUS_CONFIG } from "@/constants/payment";
import { PaymentCardProps } from "@/types/payment";
import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";

// ─── Swipe actions ────────────────────────────────────────────────────────────

const RightActions = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <View style={styles.swipeActions}>
    <TouchableOpacity
      style={[styles.swipeBtn, { backgroundColor: "#3b82f6" }]}
      onPress={onEdit}
    >
      <IconSymbol size={18} name="pencil.circle.fill" color="#fff" />
      <Text style={styles.swipeBtnText}>Edit</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.swipeBtn, { backgroundColor: "#ef4444" }]}
      onPress={onDelete}
    >
      <IconSymbol size={18} name="trash" color="#fff" />
      <Text style={styles.swipeBtnText}>Delete</Text>
    </TouchableOpacity>
  </View>
);

// ─── Main component ───────────────────────────────────────────────────────────

export default function PaymentCard({
  payment,
  onPress,
  onEdit,
  onDelete,
}: PaymentCardProps) {
  const swipeableRef = useRef<SwipeableMethods>(null);

  const handleEdit = () => {
    swipeableRef.current?.close();
    onEdit(payment);
  };

  const handleDelete = () => {
    swipeableRef.current?.close();
    onDelete(payment);
  };

  const status = STATUS_CONFIG[payment.status];
  const method = METHOD_CONFIG[payment.method];

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      renderRightActions={() => (
        <RightActions onEdit={handleEdit} onDelete={handleDelete} />
      )}
      overshootRight={false}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={() => onPress(payment)}
        activeOpacity={0.75}
      >
        {/* ── Left: method icon ── */}
        <View style={[styles.methodIcon, { backgroundColor: method.bg }]}>
          <IconSymbol size={20} name={method.icon} color={method.color} />
        </View>

        {/* ── Center: name + meta ── */}
        <View style={styles.center}>
          <Text style={styles.clientName} numberOfLines={1}>
            {payment.clientName}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{payment.method}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText}>{payment.paymentDate}</Text>
          </View>

          <View style={styles.metaRow}>
            <IconSymbol size={11} name="calendar" color="#9ca3af" />
            <Text style={styles.metaText}>Ends {payment.membershipEnd}</Text>
          </View>
        </View>

        {/* ── Right: amount + status ── */}
        <View style={styles.right}>
          <Text style={styles.amount}>
            ₹{payment.amount.toLocaleString("en-IN")}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <View style={[styles.statusDot, { backgroundColor: status.dot }]} />
            <Text style={[styles.statusText, { color: status.color }]}>
              {payment.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </ReanimatedSwipeable>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    padding: 14,
  },

  // Method icon
  methodIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },

  // Center block
  center: {
    flex: 1,
    gap: 4,
  },
  clientName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#6b7280",
  },
  metaDot: {
    fontSize: 12,
    color: "#d1d5db",
  },

  // Right block
  right: {
    alignItems: "flex-end",
    gap: 6,
    flexShrink: 0,
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },

  // Swipe actions
  swipeActions: {
    flexDirection: "row",
    marginVertical: 5,
    marginRight: 16,
    gap: 6,
  },
  swipeBtn: {
    width: 64,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    gap: 4,
  },
  swipeBtnText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
  },
});
