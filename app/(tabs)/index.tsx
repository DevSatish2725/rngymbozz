import AppHeader from "@/components/AppHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import PeakHourChart from "@/components/dashboard/PeakHourChart";
import RecentPayments from "@/components/dashboard/RecentPayment";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedView } from "@/components/themed-view";
import React from "react";
import { ScrollView } from "react-native";

export default function DashboardScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <AppHeader />
      <ScreenHeader screenName="Dashboard" />
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 14 }}
        showsVerticalScrollIndicator={false}
      >
        <DashboardStats />
        <PeakHourChart />
        <RecentPayments />
      </ScrollView>
    </ThemedView>
  );
}
