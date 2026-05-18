import { StatCard } from "@/types/dashboart";
import { IconSymbol } from "../ui/icon-symbol";
import { StyleSheet, Text, View } from "react-native";

const DashboardStatsCard = ({ item }: { item: StatCard }) => {
  return (
      <View style={styles.statCard}>
        <View style={[styles.statIcon, { backgroundColor: item.iconBg }]}>
          <IconSymbol name={item.icon} size={18} color={item.iconColor} />
        </View>
        <Text style={styles.statLabel}>{item.label}</Text>
        <Text style={styles.statValue}>{item.value}</Text>
        {item.trend && (
          <View style={styles.trendRow}>
            {item.trendType === "up" && (
              <IconSymbol name="arrow.up.right" size={10} color="#16a34a" />
            )}
            <Text
              style={[
                styles.trendText,
                item.trendType === "up"
                  ? styles.trendUp
                  : styles.trendNeutral,
              ]}
            >
              {item.trend}
            </Text>
          </View>
        )}
      </View>
  );
};

export default DashboardStatsCard;

const styles = StyleSheet.create({
 statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    padding: 14,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 11,
    color: "#6b7280",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 4,
  },
  trendText: {
    fontSize: 11,
  },
  trendUp: {
    color: "#16a34a",
  },
  trendNeutral: {
    color: "#6b7280",
  },
});
