import AppButton from "@/components/AppButton";
import AppHeader from "@/components/AppHeader";
import ClientsList from "@/components/clients/ClientsList";
import Filter from "@/components/clients/Filter";
import { FILTER, SEARCH_BY_NAME_AND_PHONE } from "@/components/clients/utils";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import useAppDispatch from "@/hooks/use-dispatch";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import SearchInput from "../../../components/clients/SearchInput";
import {
  allClientsStateFn,
  loadingStateFn,
} from "../../../redux/features/clients/clientsSlice";
import { allClientsThunk } from "../../../redux/features/clients/clientsThunk";
import { AllClientsData, FilterStatus } from "../../../types/clients";
import theme from "../../theme/theme";
import DeleteBottomSheet from "@/components/clients/DeleteBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";

export default function Clients() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("All");
  const [showClientsData, setShowClientsData] = useState<AllClientsData[]>([]);
  const dispatch = useAppDispatch();
  const loading = useSelector(loadingStateFn);
  const allClientsData = useSelector(allClientsStateFn);
   const deleteSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    dispatch(allClientsThunk());
  }, []);
  useEffect(() => {
    if (allClientsData.length) {
      setShowClientsData(allClientsData);
    }
  }, [allClientsData]);
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
    router.push({
      pathname: "/clients/[id]",
      params: { id: client.id },
    });
  };
  const clientEditHandler = (client: AllClientsData) => {
    router.push({
      pathname: "/clients/[id]/edit",
      params: { id: client.id },
    });
  };

  const handleDeletePress = () => {
       // open sheet
  };

  const handleDeleteConfirm = async () => {
    deleteSheetRef.current?.close();
    // await dispatch(deleteClient(id));
    router.dismissAll();
    router.push("/(tabs)/clients");
  };
  const clientDeleteHandler = (client: AllClientsData) => {
    deleteSheetRef.current?.expand();  
  };
  const handleDeleteCancel = () => {
    deleteSheetRef.current?.close();
  };
  return (
    <ThemedView style={{ flex: 1 }}>
      <AppHeader />
      <ScreenHeader screenName="Clients" />
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
          <AppButton
            title="Add New Client"
            onPress={addNewClientHandler}
            customStyle={{
              backgroundColor: theme.colors.primary,
              color: "#fff",
            }}
            icon={<IconSymbol size={28} name="plus" color={"#fff"} />}
            width={180}
          />
        </View>
        <SearchInput searchHandler={searchHandler} value={search} />
        <Filter filter={filter} filterHandler={filterHandler} />
        <ClientsList
          clients={showClientsData}
          onPress={clientViewHandler}
          onEdit={clientEditHandler}
          onDelete={clientDeleteHandler}
        />
        <DeleteBottomSheet
        ref={deleteSheetRef}
        clientName={"Temp"}
        onDelete={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
  },
  tableHeader: { flexDirection: "row", marginVertical: 16, gap: 12 },
  tableHeaderTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  tableRow: {
    flexDirection: "row",
    marginVertical: 16,
    gap: 40,
  },
  tableRowData: {
    fontSize: 12,
  },
});
