import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";
import { isAuthenticated, loadingState } from "./redux/features/auth/authSlice";

export default function Index() {
  const isAllowed = useSelector(isAuthenticated);
  const loading = useSelector(loadingState);
  console.log("Is user authenticated in Index page?", isAllowed);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (!isAllowed) {
    return <Redirect href="/(auth)" />;
  }

  return <Redirect href="/(tabs)" />;
}
