import { PaymentsScreenProps } from "@/types/payment";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";
import { METHOD_OPTIONS } from "@/constants/payment";
import theme from "@/app/theme/theme";

const PaymentFilterActions = ({
  searchQuery,
  selectedMethod,
  onSearchChange,
  onMethodFilterChange,
}: PaymentsScreenProps) => (
  <View>
      <View style={styles.container}>
      {/* Search input */}
      <View style={styles.searchBox}>
        <IconSymbol name="magnifyingglass" size={15} color="#9ca3af" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by client name..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={onSearchChange}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>
      {/* Filters */}<ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {METHOD_OPTIONS.map((opt) => (
    <TouchableOpacity
      key={opt.value}
      style={[
        styles.chip,
        selectedMethod === opt.value && styles.chipActive,
      ]}
      onPress={() => onMethodFilterChange(opt.value)}
    >
      <Text style={selectedMethod === opt.value && styles.chipTextActive}>
        {opt.label}
      </Text>
    </TouchableOpacity>
  ))}
</ScrollView>
    </View>
  </View>
);

export default PaymentFilterActions;

const styles = StyleSheet.create({
    container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: "#f3f4f6",
    },
  // Filters
  filterRow: {
    flexDirection: "row",
    gap: 10,
  },
  filterBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
    paddingVertical: 0,
  },
    chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
  },
  chipActive: {
    backgroundColor: theme.colors.primary,
  },
  chipText: {
    fontSize: 13,
    color: "#374151",
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
})