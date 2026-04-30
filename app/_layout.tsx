import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";
import store from "../redux/store";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import AppInitializer from "./appInitializer";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AppInitializer />
          <Slot />
          <Toast />
          <StatusBar style="auto" />
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
