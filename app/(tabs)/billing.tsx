import AppHeader from "@/components/AppHeader";
import BillingCard from "@/components/billing/BillingCard";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedView } from "@/components/themed-view";
import { CYCLES } from "@/constants/billing/billingCycle";
import { PLANS } from "@/constants/billing/billingData";
import { BillingCycle, BillingProps } from "@/types/billing";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import theme from "../theme/theme";

export default function Billing({ onSelectPlan }: BillingProps) {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  return (
    <ThemedView style={{ flex: 1 }}>
      <AppHeader pageName="Billing"/>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pricing Plans</Text>
          <Text style={styles.headerSub}>
            Choose the perfect plan for your business needs.
          </Text>
        </View>

        {/* Billing cycle toggle */}
        <View style={styles.toggleRow}>
          {CYCLES.map((c) => (
            <TouchableOpacity
              key={c.key}
              style={[
                styles.toggleBtn,
                cycle === c.key && styles.toggleBtnActive,
              ]}
              onPress={() => setCycle(c.key)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.toggleBtnText,
                  cycle === c.key && styles.toggleBtnTextActive,
                ]}
              >
                {c.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Plan cards */}
        {PLANS.map((plan) => (
          <BillingCard
            key={plan.id}
            plan={plan}
            cycle={cycle}
            onSelectPlan={onSelectPlan}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Scroll
  scroll: {
    padding: 16,
    gap: 12,
  },

  // Header
  header: {
    alignItems: "center",
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  headerSub: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },

  // Toggle
  toggleRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 3,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    marginBottom: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 30,
    alignItems: "center",
  },
  toggleBtnActive: {
    backgroundColor: theme.colors.primary,
  },
  toggleBtnText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
  },
  toggleBtnTextActive: {
    color: "#fff",
  },
});
