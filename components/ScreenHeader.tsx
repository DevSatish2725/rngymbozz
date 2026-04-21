import theme from "@/app/theme/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function ScreenHeader({ screenName }: { screenName: string }) {
  return (
    <View style={[styles.headerBanner]}>
      <Text style={styles.headerTitle}>{screenName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBanner: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
  },
});
