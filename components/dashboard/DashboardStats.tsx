import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DashboardStatsCard from './DashboardStatsCard'
import { StatCard } from '@/types/dashboart';
import theme from '@/app/theme/theme';

const DEFAULT_STATS: StatCard[] = [
  {
    id: "footfall",
    label: "Today's footfall",
    value: "48",
    icon: "figure.walk",
    iconBg: "#eeedfe",
    iconColor: theme.colors.primary,
    trend: "+12% vs yesterday",
    trendType: "up",
  },
  {
    id: "inside",
    label: "Members inside",
    value: "14",
    icon: "person.3.fill",
    iconBg: "#e1f5ee",
    iconColor: "#0f6e56",
    trend: "Live right now",
    trendType: "neutral",
  },
  {
    id: "active",
    label: "Active members",
    value: "312",
    icon: "person.fill.checkmark",
    iconBg: "#e6f1fb",
    iconColor: "#185fa5",
    trend: "+8 this month",
    trendType: "up",
  },
  {
    id: "revenue",
    label: "Monthly revenue",
    value: "₹1.24L",
    icon: "indianrupeesign.circle.fill",
    iconBg: "#faeeda",
    iconColor: "#854f0b",
    trend: "+18% vs last",
    trendType: "up",
  },
];
const DashboardStats = () => {
  return (
      <View>
          <Text style={styles.sectionTitle}>{`Today's overview`}</Text>
          <View style={styles.statsGrid}>
            {DEFAULT_STATS.map((s) => (
              <DashboardStatsCard key={s.id} item={s} />
            ))}
          </View>
        </View>
  )
}

export default DashboardStats

const styles = StyleSheet.create({
     sectionTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
    letterSpacing: 0.4,
    marginBottom: 10,
  },
  // Stats grid
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
})