import { FlatList, StyleSheet, Text, View } from "react-native";

import AppButton from "@/components/AppButton";
import DashboardStatsCard from "@/components/dashboard/DashboardStatsCard";
import PeakHourChart from "@/components/dashboard/PeakHourChart";
import {
  RecentPaymentItem,
  RecentPaymentType,
} from "@/components/dashboard/RecentPayments";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { router } from "expo-router";
import theme from "../theme/theme";

type DashboardSection =
  | { type: "stats" }
  | { type: "chart" }
  | { type: "recentPayment-header" }
  | { type: "recentPayment"; data: RecentPaymentType }
  | { type: "footer" };

const RecentPaymentData: RecentPaymentType[] = [
  {
    id: 1,
    clientName: "Test1",
    paymentMode: "Cash",
    amount: 500,
  },
  {
    id: 2,
    clientName: "Test2",
    paymentMode: "UPI",
    amount: 1500,
  },
  {
    id: 3,
    clientName: "Test3",
    paymentMode: "Card",
    amount: 2500,
  },
];

function BuildSections(
  recentPaymentsData: RecentPaymentType[],
): DashboardSection[] {
  return [
    { type: "stats" },
    { type: "chart" },
    { type: "recentPayment-header" },
    ...recentPaymentsData.map((p) => ({
      type: "recentPayment" as const,
      data: p,
    })),
    { type: "footer" },
  ];
}

export default function Dashboard() {
  const sections = BuildSections(RecentPaymentData);

  const renderSections = ({ item }: { item: DashboardSection }) => {
    switch (item.type) {
      case "stats":
        return (
          <View style={styles.statsContainer}>
            <DashboardStatsCard
              title={"Today's Footfall"}
              count={0}
              icon={
                <IconSymbol
                  size={28}
                  name={"calendar.circle.fill"}
                  color="#155dfc"
                />
              }
              iconBg="#eff6ff"
            />
            <DashboardStatsCard
              title={"Members Inside"}
              count={0}
              icon={
                <IconSymbol
                  size={28}
                  name={"door.left.hand.open"}
                  color="#e17100"
                />
              }
              iconBg="#fffbeb"
            />
            <DashboardStatsCard
              title={"Active Members"}
              count={0}
              icon={
                <IconSymbol
                  size={28}
                  name={"person.2.circle.fill"}
                  color="#096"
                />
              }
              iconBg="#ecfdf5"
            />
            <DashboardStatsCard
              title={"Monthly Revenue"}
              count={`₹ ${0}`}
              icon={
                <IconSymbol size={28} name={"banknote.fill"} color="#9810fa" />
              }
              iconBg="#faf5ff"
            />
          </View>
        );
      case "chart":
        return <PeakHourChart />;
      case "recentPayment-header":
        return <Text style={styles.recentPaymentTitle}>Recent Payments</Text>;
      case "recentPayment":
        return <RecentPaymentItem item={item.data} />;
      case "footer":
        return (
          <AppButton
            title="View all payments"
            onPress={() => router.push("/payments")}
          />
        );
      default:
        return null;
    }
  };
  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={[styles.headerBanner]}>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>
      <FlatList
        data={sections}
        keyExtractor={(item, index) => {
          return item.type === "recentPayment"
            ? String(item.data.id)
            : `${item.type} - ${index}`;
        }}
        renderItem={renderSections}
        contentContainerStyle={[styles.contentContainer]}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerBanner: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
  },
  titleContainer: {
    paddingBlock: 12,
    paddingHorizontal: 12,
    color: "#fff",
    fontSize: 18,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  contentContainer: {
    padding: 16,
  },
  recentPaymentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 12,
  },
});
