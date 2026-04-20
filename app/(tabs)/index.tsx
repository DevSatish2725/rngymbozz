import { StyleSheet, Text, View } from "react-native";

import AppBarchart from "@/components/dashboard/Barchart";
import DashboardStatsCard from "@/components/dashboard/DashboardStatsCard";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import theme from "../theme/theme";
import RecentPayments from "@/components/dashboard/RecentPayments";
import AppButton from "@/components/AppButton";
import { router } from "expo-router";

export default function Dashboard() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: theme.colors.primary, dark: "#1D3D47" }}
      headerImage={<Text style={styles.titleContainer}>Dashboard</Text>}
    >
      <ThemedView>
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
          <AppBarchart />
          <View style={{flex: 1}}>
          <RecentPayments />
            <AppButton title="View all payments" onPress={() => router.push("/payments")} />
            </View>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
