import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import theme from '@/app/theme/theme'
import { PaymentTopUIProps } from '@/types/payment'
import { IconSymbol } from '../ui/icon-symbol'

const PaymentTopUI = ({total, onLogPayment}: PaymentTopUIProps) => {
  return (
       <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <View style={styles.totalBadge}>
              <Text style={styles.totalLabel}>TOTAL: </Text>
              <Text style={styles.totalAmt}>
                ₹{(total ?? 0).toLocaleString("en-IN")}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.logBtn}
            onPress={onLogPayment}
            activeOpacity={0.85}
          >
            <IconSymbol name="plus" size={15} color="#fff" />
            <Text style={styles.logBtnText}>Log Payment</Text>
          </TouchableOpacity>
        </View>
  )
}

export default PaymentTopUI

const styles = StyleSheet.create({
    headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
    totalBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#fff",
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6b7280",
    letterSpacing: 0.4,
  },
  totalAmt: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  logBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  logBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },
})