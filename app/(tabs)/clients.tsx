import AppButton from "@/components/AppButton";
import { AppSelect } from "@/components/AppSelect";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet, Text, TextInput, View } from "react-native";
import theme from "../theme/theme";
import { ScrollView } from "react-native";

type TopSectionType = {
  addNewClientHandler: () => void;
};
const TopSection = ({ addNewClientHandler }: TopSectionType) => {
  return (
    <View style={{ flex: 1 }}>
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
          customStyle={{ backgroundColor: theme.colors.primary, color: "#fff" }}
          icon={<IconSymbol size={28} name="plus" color={"#fff"} />}
          width={180}
        />
      </View>
      <View style={styles.searchInputContainer}>
        <IconSymbol size={20} name="magnifyingglass" color={"gray"} />
        <TextInput placeholder="Search by name or phone..." />
      </View>
      <View style={styles.filterContainer}>
        <IconSymbol
          size={20}
          name="line.horizontal.3.decrease.circle.fill"
          color="gray"
        />
        <View style={{ flex: 1 }}>
          <AppSelect />
        </View>
      </View>
    </View>
  );
};

export default function Clients() {
  const addNewClientHandler = () => {};
  return (
    <ThemedView style={{ flex: 1 }}>
      <ScreenHeader screenName="Clients" />
      <FlashList
        data={[{ id: 1, title: "Hello" }]}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        // estimatedItemSize={80}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={
          <TopSection addNewClientHandler={addNewClientHandler} />
        }
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    marginVertical: 16,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
  },
  filterContainer: {
    flexDirection: "row",
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
  },
});
