import theme from "@/app/theme/theme";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { TimeFilterSheetProps } from "@/types/payment";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function PaymentTimeFilter({
  value,
  openTimeFilterSheet,
}: TimeFilterSheetProps) {
  return (
    <TouchableOpacity
      style={styles.trigger}
      onPress={openTimeFilterSheet}
      activeOpacity={0.75}
    >
      <IconSymbol name="clock.fill" size={14} color="#4f46e5" />
      <Text style={styles.triggerText} numberOfLines={1}>
        {value}
      </Text>
      <IconSymbol name="chevron.down" size={11} color="#9ca3af" />
    </TouchableOpacity>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#eeedfe",
    borderWidth: 1,
    borderColor: "#c7d2fe",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  triggerText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.primary,
  },
});
