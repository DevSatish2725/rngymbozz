import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "../ui/icon-symbol.ios";

const EmptyState = () => (
  <View style={styles.emptyState}>
    <View style={styles.emptyIcon}>
      <IconSymbol name="indianrupeesign.circle" size={36} color="#d1d5db" />
    </View>
    <Text style={styles.emptyTitle}>No payments yet</Text>
    <Text style={styles.emptySub}>
      {/* Tap "+ Log Payment" to record your first payment. */}
    </Text>
  </View>
);

export default EmptyState;

const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    paddingTop: 72,
    paddingHorizontal: 40,
    gap: 10,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#f9fafb",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  emptySub: {
    fontSize: 13,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 20,
  },
});
