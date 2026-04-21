import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export function AppSelect() {
  const [value, setValue] = useState("Test");
  const data = [
    { label: "Java", value: "java" },
    { label: "JavaScript", value: "js" },
  ];
  return (
    <Dropdown
      style={{ width: "100%" }}
      data={data}
      labelField="label"
      valueField="value"
      value={value}
      onChange={(item) => setValue(item.value)}
      placeholder="Select item"
    />
  );
}

const styles = StyleSheet.create({});
