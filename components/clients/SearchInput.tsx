import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";

function SearchInput({ searchHandler, value }: any) {
  //   const inputRef = useRef(null);
  // const keyboardVisible = useRef(false);

  return (
    <View style={styles.container}>
      <IconSymbol size={20} name="magnifyingglass" color={"gray"} />
      <TextInput
        placeholder="Search by name or phone..."
        clearButtonMode="while-editing"
        value={value}
        onChangeText={(value) => searchHandler(value)}
        style={{ flex: 1 }}
      />
    </View>
  );
}

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    marginVertical: 16,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
  },
});
