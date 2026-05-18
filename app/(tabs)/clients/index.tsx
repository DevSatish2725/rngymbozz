import AppHeader from "@/components/AppHeader";
import ClientsList from "@/components/clients/ClientsList";
import Filter from "@/components/clients/Filter";
import ShimmerCard from "@/components/clients/ShimmerCard";
import { FILTER, SEARCH_BY_NAME_AND_PHONE } from "@/components/clients/utils";
import ShimmerFlashList from "@/components/ShimmerFlashList";
import { ThemedView } from "@/components/themed-view";
import AppBottomSheet from "@/components/ui/AppBottomSheet";
import { IconSymbol } from "@/components/ui/icon-symbol";
import useAppDispatch from "@/hooks/use-dispatch";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import SearchInput from "../../../components/clients/SearchInput";
import {
  allClientsStateFn,
  clearDeleteData,
  clientIDStateFn,
  deleteClientDataStateFn,
  loadingStateFn,
  setClientID,
} from "../../../redux/features/clients/clientsSlice";
import {
  allClientsThunk,
  deleteClientThunk,
} from "../../../redux/features/clients/clientsThunk";
import { AllClientsData, FilterStatus } from "../../../types/clients";
import theme from "../../theme/theme";

export default function Clients() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("All");
  const [showClientsData, setShowClientsData] = useState<AllClientsData[]>([]);
  const dispatch = useAppDispatch();
  const loading = useSelector(loadingStateFn);
  const allClientsData = useSelector(allClientsStateFn);
  const clientID = useSelector(clientIDStateFn);
  const deleteData = useSelector(deleteClientDataStateFn);
  const deleteSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    dispatch(allClientsThunk());
    return () => {
      dispatch(clearDeleteData());
    };
  }, []);
  useEffect(() => {
    if (allClientsData.length) {
      setShowClientsData(allClientsData);
    }
  }, [allClientsData]);
  useEffect(() => {
    if (deleteData) {
      Toast.show({
        type: "success",
        text1: deleteData,
      });
    }
  }, [deleteData]);

  const addNewClientHandler = () => {
    router.push("/clients/new");
  };
  const searchHandler = (value: string) => {
    const searchedList = SEARCH_BY_NAME_AND_PHONE(allClientsData, value);
    setShowClientsData(searchedList);
    setSearch(value);
  };
  const filterHandler = (value: FilterStatus) => {
    const filteredList = FILTER(allClientsData, value);
    setShowClientsData(filteredList);
    setFilter(value);
  };
  const clientViewHandler = (client: AllClientsData) => {
    dispatch(setClientID(client.id));
    router.push("/clients/[id]");
  };
  const clientEditHandler = (client: AllClientsData) => {
    dispatch(setClientID(client.id));
    router.push("/clients/[id]/edit");
  };

  const handleDeleteConfirm = async () => {
    deleteSheetRef.current?.close();
    await dispatch(deleteClientThunk(clientID));
  };
  const clientDeleteHandler = (client: AllClientsData) => {
    dispatch(setClientID(client.id));
    dispatch(clearDeleteData());
    deleteSheetRef.current?.expand();
  };
  const handleDeleteCancel = () => {
    deleteSheetRef.current?.close();
  };
  const clientPaymentHandler = (client: AllClientsData) => {
    console.log("Payment for client:", client);
  };
  return (
    <ThemedView style={{ flex: 1 }}>
      <AppHeader pageName="Clients" />
      <View style={{ flex: 1, padding: 12 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Member Directory
          </Text>
          <TouchableOpacity
            style={styles.logBtn}
            onPress={addNewClientHandler}
            activeOpacity={0.85}
          >
            <IconSymbol name="plus" size={15} color="#fff" />
            <Text style={styles.logBtnText}>Add new client</Text>
          </TouchableOpacity>
        </View>
        <SearchInput searchHandler={searchHandler} value={search} />
        <Filter filter={filter} filterHandler={filterHandler} />
        {loading ? (
          <View style={{ flex: 1 }}>
            <ShimmerFlashList
              itemCount={4}
              estimatedItemSize={80}
              renderShimmerCard={({ translateX, screenWidth }) => {
                const w = screenWidth - 32;
                return <ShimmerCard translateX={translateX} screenWidth={w} />;
              }}
            />
          </View>
        ) : (
          <ClientsList
            clients={showClientsData}
            onPress={clientViewHandler}
            onEdit={clientEditHandler}
            onDelete={clientDeleteHandler}
            onPay={clientPaymentHandler}
          />
        )}
        <AppBottomSheet
          ref={deleteSheetRef}
          onSuccess={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          title={"Delete Client?"}
          subtitle="All membership data and payment history will be permanently removed."
          successBtnText="Delete permanently"
          cancelBtnText="Cancel"
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
});
