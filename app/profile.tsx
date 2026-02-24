import AppButton from "@/components/AppButton";
import useAppDispatch from "@/hooks/use-dispatch";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { logout } from "./redux/features/auth/authSlice";
import storage from "@/config/storage";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    setLoading(true);
    const response = new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
    await response;
    await storage.removeItem("token");
    dispatch(logout());
    setLoading(false);
    router.replace("/(auth)");
  };
  return (
    <>
      <Stack.Screen options={{ title: "My Profile" }} />{" "}
      {/* To change default page header name */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Profile</Text>
        <AppButton title="Logout" onPress={handleLogout} loading={loading} />
      </View>
    </>
  );
}
