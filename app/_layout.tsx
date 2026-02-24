import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";
import store from "../app/redux/store";

import { useColorScheme } from "@/hooks/use-color-scheme";
import Toast from "react-native-toast-message";
import AppInitializer from "./appInitializer";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AppInitializer />
        <Slot />
        <Toast />
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
