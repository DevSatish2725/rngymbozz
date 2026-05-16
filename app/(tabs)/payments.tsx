import AppHeader from "@/components/AppHeader";
import PaymentCard from "@/components/payment/PaymentCard";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedView } from "@/components/themed-view";
import { PaymentRecord } from "@/types/payment";
import { FlashList } from "@shopify/flash-list";
import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import EmptyState from "@/components/payment/EmptyState";
import PaymentFilterActions from "@/components/payment/PaymentFilterActions";
import PaymentTimeFilter from "@/components/payment/PaymentTimeFIlter";
import PaymentTopUI from "@/components/payment/PaymentTopUI";
import TimeFilterBottomSheet from "@/components/payment/TimeFilterBottomSheet";
import { TIME_OPTIONS_DETAILS } from "@/constants/payment";
import { getDaysBetweenDates } from "@/utils/getDaysBetweenDate";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";

export default function PaymentsScreen() {
  // const [totalPayment, setTotalPayment] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTime, setSelectedTime] = useState("all");
  const [selectedMethod, setSelectedMethod] = useState("all");
  const [filterTypes, setFilterTypes] = useState({
    name: "",
    method: "",
    time: "",
  });
  const [payments, setPayments] = useState<PaymentRecord[]>([
    {
      clientName: "John Doe",
      amount: 100,
      paymentDate: "2025-11-01",
      method: "Cash",
      id: "1",
      membershipEnd: "2026-12-31",
      status: "Paid",
    },
    {
      clientName: "Jane Smith",
      amount: 150,
      paymentDate: "2026-05-15",
      method: "Card",
      id: "2",
      membershipEnd: "2026-11-30",
      status: "Pending",
    },
    {
      clientName: "Alice Johnson",
      amount: 200,
      paymentDate: "2026-03-10",
      method: "UPI",
      id: "3",
      membershipEnd: "2026-09-30",
      status: "Failed",
    },
  ]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const selectedTimeOption = useMemo(() => {
    return (
      TIME_OPTIONS_DETAILS.find((option) => option.value === selectedTime)
        ?.label || "All Time"
    );
  }, [selectedTime]);

  const openTimeFilterSheet = () => bottomSheetRef.current?.expand();
  const closeTimeFilterSheet = () => bottomSheetRef.current?.close();

  const onLogPayment = () => {
    router.push("/(tabs)/clients");
  };

  const filteredPayments = useMemo(() => {
    let filteredList = [...payments];
    if (filterTypes.time && filterTypes.time !== "all") {
      if (filterTypes.time === "this_month") {
        filteredList = filteredList.filter((payment) => {
          const noOfDays = getDaysBetweenDates(new Date(), payment.paymentDate);
          return noOfDays <= 30;
        });
      } else if (filterTypes.time === "past_3_months") {
        filteredList = filteredList.filter((payment) => {
          const noOfDays = getDaysBetweenDates(new Date(), payment.paymentDate);
          return noOfDays <= 90;
        });
      } else if (filterTypes.time === "past_6_months") {
        filteredList = filteredList.filter((payment) => {
          const noOfDays = getDaysBetweenDates(new Date(), payment.paymentDate);
          return noOfDays <= 180;
        });
      } else if (filterTypes.time === "this_year") {
        filteredList = filteredList.filter((payment) => {
          return (
            new Date(payment.paymentDate).getFullYear() ===
            new Date().getFullYear()
          );
        });
      }
    }
    if (filterTypes.method && filterTypes.method !== "all") {
      filteredList = filteredList.filter(
        (payment) => payment.method.toLowerCase() === filterTypes.method,
      );
    }
    if (filterTypes.name.trim() !== "") {
      filteredList = filteredList.filter((payment) =>
        payment.clientName
          .toLowerCase()
          .includes(filterTypes.name.toLowerCase()),
      );
    }
    return filteredList;
  }, [filterTypes, payments]);

  const handleMethodFilter = (method: string) => {
    setSelectedMethod(method);
    setFilterTypes((prev) => ({
      ...prev,
      method,
    }));
  };
  const onSearchChange = (text: string) => {
    setSearchQuery(text);
    setFilterTypes((prev) => ({
      ...prev,
      name: text,
    }));
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };
  const onLoadMore = () => {
    console.log("Load more payments");
  };
  const onRowPress = (payment: PaymentRecord) => {
    console.log("Payment pressed:", payment);
  };
  const onEdit = (payment: PaymentRecord) => {
    console.log("Edit payment:", payment);
  };
  const onDelete = (payment: PaymentRecord) => {
    console.log("Delete payment:", payment);
  };
  const handleTimeFilter = (selectedOption: string) => {
    setSelectedTime(selectedOption);
    setFilterTypes((prev) => ({
      ...prev,
      time: selectedOption,
    }));
    closeTimeFilterSheet();
  };
  return (
    <ThemedView style={{ flex: 1 }}>
      <AppHeader />
      <ScreenHeader screenName="Payments" />
      <View style={styles.headerUI}>
        <PaymentTopUI
          total={filteredPayments.reduce((acc, cum) => acc + cum.amount, 0)}
          onLogPayment={onLogPayment}
        />
        <PaymentFilterActions
          searchQuery={searchQuery}
          selectedMethod={selectedMethod}
          onSearchChange={onSearchChange}
          onMethodFilterChange={handleMethodFilter}
        />
        <PaymentTimeFilter
          value={selectedTimeOption}
          openTimeFilterSheet={openTimeFilterSheet}
        />
      </View>
      {filteredPayments.length === 0 ? (
        <EmptyState />
      ) : (
        <FlashList
          data={filteredPayments}
          keyExtractor={(item) => item.id}
          // estimatedItemSize={86}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          refreshing={isRefreshing}
          // onRefresh={onRefresh}
          // onEndReached={onLoadMore}
          onEndReachedThreshold={0.4}
          renderItem={({ item }) => (
            <PaymentCard
              key={item.id}
              payment={item}
              onPress={() => onRowPress?.(item)}
              onEdit={() => onEdit?.(item)}
              onDelete={() => onDelete?.(item)}
            />
          )}
        />
      )}
      <TimeFilterBottomSheet
        onSuccess={handleTimeFilter}
        onCancel={closeTimeFilterSheet}
        timeOption={TIME_OPTIONS_DETAILS}
        selectedTime={selectedTime}
        ref={bottomSheetRef}
      />
    </ThemedView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 32,
  },
  headerUI: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    gap: 12,
  },
});
