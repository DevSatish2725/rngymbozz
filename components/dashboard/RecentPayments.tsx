import theme from "@/app/theme/theme";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function RecentPayments() {
  const [paymentList, setPaymentList] = useState([
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
  ]);

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.paymentListItem}>
        <View style={{gap: 4}}>
          <Text style={{fontSize: 20}}>{item.clientName}</Text>
          <Text style={{fontSize: 16, color: theme.colors.primary, fontWeight: 600}}>{item.paymentMode}</Text>
        </View>
        <Text style={{fontSize: 16, color: theme.colors.primary, fontWeight: 600}}>₹ {item.amount}</Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <Text style={styles.title}>Recent Payments</Text>
      <View style={styles.paymentList}>
        <FlatList
          data={paymentList}
          keyExtractor={(item) => "" + item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: theme.colors.primary,
    marginBottom: 20,
  },
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
    marginVertical: 8
  },
});
