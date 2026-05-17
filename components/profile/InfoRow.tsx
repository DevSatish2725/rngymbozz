import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconSymbol } from '../ui/icon-symbol';
import { SFSymbols7_0 } from "sf-symbols-typescript";

const InfoRow = ({
  icon,
  iconBg,
  iconColor,
  label,
  children,
}: {
  icon: SFSymbols7_0;
  iconBg: string;
  iconColor: string;
  label: string;
  children: React.ReactNode;
}) => (
  <View style={styles.infoRow}>
    <View style={[styles.infoIcon, { backgroundColor: iconBg }]}>
      <IconSymbol name={icon} size={17} color={iconColor} />
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      {children}
    </View>
  </View>
);

export default InfoRow

const styles = StyleSheet.create({
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
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  infoContent: {
    flex: 1,
    gap: 2,
  },
  infoLabel: {
    fontSize: 11,
    color: "#6b7280",
  },
})