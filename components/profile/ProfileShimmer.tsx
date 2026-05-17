import ShimmerBox from "@/components/ui/ShimmerBox"; // adjust path as needed
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, useWindowDimensions, View } from "react-native";

export default function ProfileShimmer() {
  const { width: screenWidth } = useWindowDimensions();
  const translateX = useRef(new Animated.Value(-screenWidth)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: screenWidth,
        duration: 1100,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  return (
    <View style={styles.scroll}>
      {/* ── Avatar section skeleton ── */}
      <View style={styles.avatarSection}>
        {/* Avatar circle */}
        <ShimmerBox
          translateX={translateX}
          width={screenWidth}
          style={styles.avatarCircle}
        />
        {/* Name */}
        <ShimmerBox
          translateX={translateX}
          width={screenWidth}
          style={styles.nameLine}
        />
        {/* Plan pill */}
        <ShimmerBox
          translateX={translateX}
          width={screenWidth}
          style={styles.planPill}
        />
        {/* Edit profile link */}
        {/* <ShimmerBox
          translateX={translateX}
          width={screenWidth}
          style={styles.editLine}
        /> */}
      </View>

      {/* ── Personal info card skeleton ── */}
      <View style={styles.card}>
        {/* Card label */}
        <ShimmerBox
          translateX={translateX}
          width={screenWidth}
          style={styles.cardLabel}
        />
        {/* Full name row */}
        <InfoRowShimmer
          translateX={translateX}
          width={screenWidth}
          valueWidth="60%"
        />
        {/* Phone row */}
        <InfoRowShimmer
          translateX={translateX}
          width={screenWidth}
          valueWidth="50%"
        />
        {/* Address row */}
        <InfoRowShimmer
          translateX={translateX}
          width={screenWidth}
          valueWidth="75%"
        />
      </View>

      {/* ── Gym & membership card skeleton ── */}
      <View style={styles.card}>
        {/* Card label */}
        <ShimmerBox
          translateX={translateX}
          width={screenWidth}
          style={styles.cardLabel}
        />
        {/* Gym name row */}
        <InfoRowShimmer
          translateX={translateX}
          width={screenWidth}
          valueWidth="55%"
        />
        {/* Plan row */}
        <InfoRowShimmer
          translateX={translateX}
          width={screenWidth}
          valueWidth="65%"
        />
        {/* Status row — badge shape */}
        <InfoRowShimmer
          translateX={translateX}
          width={screenWidth}
          valueWidth="30%"
        />
      </View>

      {/* ── Logout button skeleton ── */}
      <ShimmerBox
        translateX={translateX}
        width={screenWidth}
        style={styles.logoutCard}
      />
    </View>
  );
}

// ─── InfoRow shimmer — matches icon + label + value layout ───────────────────

function InfoRowShimmer({
  translateX,
  width,
  valueWidth,
}: {
  translateX: Animated.Value;
  width: number;
  valueWidth: string;
}) {
  return (
    <View style={styles.infoRow}>
      {/* Icon box */}
      <ShimmerBox
        translateX={translateX}
        width={width}
        style={styles.infoIcon}
      />
      <View style={styles.infoContent}>
        {/* Label (short, thin) */}
        <ShimmerBox
          translateX={translateX}
          width={width}
          style={styles.infoLabel}
        />
        {/* Value (wider) */}
        <ShimmerBox
          translateX={translateX}
          width={width}
          style={styles.infoValue}
        />
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scroll: {
    padding: 16,
    gap: 12,
  },

  // Avatar section
  avatarSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 10,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 4,
  },
  nameLine: {
    width: 140,
    height: 18,
    borderRadius: 6,
  },
  planPill: {
    width: 120,
    height: 26,
    borderRadius: 20,
  },
  editLine: {
    width: 80,
    height: 14,
    borderRadius: 6,
    marginTop: 2,
  },

  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    overflow: "hidden",
    paddingBottom: 4,
  },
  cardLabel: {
    width: 90,
    height: 11,
    borderRadius: 4,
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 10,
  },

  // Info row — mirrors real InfoRow padding exactly
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderTopWidth: 0.5,
    borderTopColor: "#f3f4f6",
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    flexShrink: 0,
  },
  infoContent: {
    flex: 1,
    gap: 6,
  },
  infoLabel: {
    width: 60,
    height: 10,
    borderRadius: 4,
  },
  infoValue: {
    height: 14,
    borderRadius: 5,
  },

  // Logout card
  logoutCard: {
    height: 50,
    borderRadius: 16,
  },
});
