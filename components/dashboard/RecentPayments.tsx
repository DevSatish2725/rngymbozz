import theme from "@/app/theme/theme";
import { StyleSheet, Text, View } from "react-native";

export type RecentPaymentType = {
  id: number;
  clientName: string;
  paymentMode: string;
  amount: number;
};

export function RecentPaymentItem({ item }: { item: RecentPaymentType }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.paymentListItem}>
        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: 20 }}>{item.clientName}</Text>
          <Text
            style={{
              fontSize: 16,
              color: theme.colors.primary,
              fontWeight: 600,
            }}
          >
            {item.paymentMode}
          </Text>
        </View>
        <Text
          style={{ fontSize: 16, color: theme.colors.primary, fontWeight: 600 }}
        >
          ₹ {item.amount}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paymentList: {
    gap: 12,
  },
  paymentListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
  },
});
