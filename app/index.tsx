import SplashScreen from "@/components/SplashScreen";
import { Redirect } from "expo-router";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  isAuthenticated,
  loadingState,
} from "../redux/features/auth/authSlice";

export default function Index() {
  const [splashDone, setSplashDone] = useState(false);
  const isAllowed = useSelector(isAuthenticated);
  const loading = useSelector(loadingState);
  console.log("Is user authenticated in Index page?", isAllowed);

  // ── While bootstrap is running, show animated splash ──
  if (loading || !splashDone) {
    return (
      <SplashScreen onFinish={() => setSplashDone(true)} version="1.0.0" />
    );
  }

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }
  if (!isAllowed) {
    return <Redirect href="/(auth)" />;
  }

  return <Redirect href="/(tabs)" />;
}
