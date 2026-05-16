import { IconSymbol } from "@/components/ui/icon-symbol";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const AttendanceSearch = ({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string;
  onSearchChange: (text: string) => void;
}) => {
  return (
    <View style={styles.searchBox}>
      <IconSymbol name="magnifyingglass" size={15} color="#9ca3af" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search member..."
        placeholderTextColor="#9ca3af"
        value={searchQuery}
        onChangeText={onSearchChange}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
};

export default AttendanceSearch;

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
    paddingVertical: 0,
  },
});
