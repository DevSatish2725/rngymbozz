import theme from "@/app/theme/theme";
import { PeakHour } from "@/types/dashboart";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";
import PeakBar from "./PeakBar";
const DEFAULT_PEAK_HOURS: PeakHour[] = [
  { label: "6A", percentage: 28 },
  { label: "7A", percentage: 52 },
  { label: "8A", percentage: 78 },
  { label: "9A", percentage: 40 },
  { label: "12P", percentage: 22 },
  { label: "5P", percentage: 35 },
  { label: "6P", percentage: 62 },
  { label: "7P", percentage: 100 },
  { label: "8P", percentage: 85 },
  { label: "9P", percentage: 48 },
];

const PeakHourChart = () => {
  const maxPct = Math.max(...DEFAULT_PEAK_HOURS.map((h) => h.percentage));
  const peakLabel = "7–8 PM";
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>Peak hours</Text>
          <Text style={styles.cardSub}>{`Today's hourly footfall`}</Text>
        </View>
        <View style={styles.peakBadge}>
          <IconSymbol name="flame.fill" size={12} color="#4f46e5" />
          <Text style={styles.peakBadgeText}>Peak: {peakLabel}</Text>
        </View>
      </View>
      <View style={styles.barsContainer}>
        {DEFAULT_PEAK_HOURS.map((h) => (
          <PeakBar key={h.label} item={h} maxPct={maxPct} />
        ))}
      </View>
      <View style={styles.legend}>
        {[
          { color: theme.colors.primary, label: "High" },
          { color: "#c7d2fe", label: "Moderate" },
          { color: "#e0e7ff", label: "Low" },
        ].map((l) => (
          <View key={l.label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: l.color }]} />
            <Text style={styles.legendText}>{l.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PeakHourChart;

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
  legend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: "#6b7280",
  },
  // Peak hours
  peakBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#eeedfe",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  peakBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4f46e5",
  },
  barsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 80,
    gap: 5,
  },
});
