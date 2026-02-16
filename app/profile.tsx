import AppButton from "@/components/AppButton";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    const response = new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
    await response;
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
