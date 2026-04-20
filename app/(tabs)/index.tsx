import { StyleSheet, Text } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import theme from "../theme/theme";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: theme.colors.primary, dark: "#1D3D47" }}
    headerImage={
      <Text style={styles.titleContainer}>Dashboard</Text>
    }
    >
      <ThemedView style={styles.titleContainer}>
        {/* <HelloWave /> */}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingBlock: 12,
    paddingHorizontal: 12,
    color: "#fff",
    fontSize: 18
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
