import theme from "@/app/theme/theme";
import { BillingCardProps } from "@/types/billing";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BillingCard = ({ plan, cycle, onSelectPlan }: BillingCardProps) => {
  return (
    <View
      key={plan.id}
      style={[styles.card, plan.featured && styles.cardFeatured]}
    >
      {plan.featured && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
        </View>
      )}

      {/* Icon */}
      <View style={[styles.planIcon, { backgroundColor: plan.iconBg }]}>
        <Text style={[styles.planIconText, { color: plan.iconColor }]}>
          {plan.icon}
        </Text>
      </View>

      {/* Name + price */}
      <Text style={styles.planName}>{plan.name}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.priceAmt}>
          ₹{plan.prices[cycle].toLocaleString("en-IN")}
        </Text>
        <Text style={styles.pricePer}>/{plan.cycleLabel[cycle]}</Text>
      </View>

      {/* Features */}
      <View style={styles.features}>
        {plan.features.map((f) => (
          <View key={f} style={styles.featureRow}>
            <View style={styles.checkCircle}>
              <Text style={styles.checkMark}>✓</Text>
            </View>
            <Text style={styles.featureText}>{f}</Text>
          </View>
        ))}
      </View>

      {/* CTA */}
      <TouchableOpacity
        style={[styles.selectBtn, plan.featured && styles.selectBtnFeatured]}
        activeOpacity={0.85}
        onPress={() => onSelectPlan?.(plan, cycle)}
      >
        <Text
          style={[
            styles.selectBtnText,
            plan.featured && styles.selectBtnTextFeatured,
          ]}
        >
          Select {plan.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BillingCard;

const styles = StyleSheet.create({
  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    marginTop: 8,
  },
  cardFeatured: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginTop: 20, // extra space for badge
  },

  // Popular badge
  popularBadge: {
    position: "absolute",
    top: -14,
    alignSelf: "center",
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },
  popularBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#fff",
    letterSpacing: 0.8,
  },

  // Plan icon
  planIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  planIconText: {
    fontSize: 22,
  },

  // Plan name & price
  planName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginBottom: 16,
  },
  priceAmt: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },
  pricePer: {
    fontSize: 14,
    color: "#6b7280",
  },

  // Features
  features: {
    gap: 10,
    marginBottom: 18,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  checkMark: {
    fontSize: 11,
    color: theme.colors.primary,
    fontWeight: "700",
  },
  featureText: {
    fontSize: 13,
    color: "#374151",
  },

  // Select button
  selectBtn: {
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#d1d5db",
    backgroundColor: "#fff",
  },
  selectBtnFeatured: {
    backgroundColor: theme.colors.primary,
    borderWidth: 0,
  },
  selectBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  selectBtnTextFeatured: {
    color: "#fff",
  },
});
