import theme from "@/app/theme/theme";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FilterStatus } from "../../types/clients";

const FILTER_OPTIONS: FilterStatus[] = [
  "All",
  "Active",
  "In Active",
  "Expiring Soon",
  "Expired",
];
function Filter({ filter, filterHandler }: any) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0 }}
    >
      <View style={styles.filterRow}>
        {FILTER_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => filterHandler(option)}
            style={
              filter === option
                ? { ...styles.chip, ...styles.chipActive }
                : styles.chip
            }
          >
            <Text
              style={
                filter === option
                  ? { ...styles.chipText, ...styles.chipTextActive }
                  : styles.chipText
              }
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default Filter;

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    gap: 8,
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
});
