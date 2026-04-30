import AppButton from "@/components/AppButton";
import storage from "@/config/storage";
import useAppDispatch from "@/hooks/use-dispatch";
import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";
import {
  getLoading,
  getProfileDetail,
} from "../redux/features/profile/profileSlice";
import { profileThunk } from "../redux/features/profile/profileThunks";
import theme from "./theme/theme";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const profileDetails = useSelector(getProfileDetail);
  const isLoading = useSelector(getLoading);

  const handleLogout = async () => {
    const response = new Promise((resolve) => {
      setLoading(true);
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
    await response;
    await storage.removeItem("token");
    setLoading(false);
    dispatch(logout());
    router.replace("/(auth)");
  };
  useEffect(() => {
    dispatch(profileThunk());
  }, []);
  console.log("profileDetails", profileDetails);
  return (
    <>
      <Stack.Screen options={{ title: "My Profile" }} />
      {/* To change default page header name */}
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
          <View style={{ padding: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.title}>Profile</Text>
              <AppButton
                title="Logout"
                onPress={handleLogout}
                loading={loading}
                width={100}
              />
            </View>
            {isLoading ? (
              <Text>Loading...</Text>
            ) : (
              <View style={{ marginTop: 20 }}>
                <View style={styles.detail}>
                  <Text style={styles.detailLable}>Name:</Text>
                  <Text style={styles.detailValue}>
                    {profileDetails?.ownerName}
                  </Text>
                </View>
                <View style={styles.detail}>
                  <Text style={styles.detailLable}>Phone:</Text>
                  <Text style={styles.detailValue}>
                    {profileDetails?.phone}
                  </Text>
                </View>
                <View style={styles.detail}>
                  <Text style={styles.detailLable}>Address:</Text>
                  <Text style={styles.detailValue}>
                    {profileDetails?.address}
                  </Text>
                </View>
                <View style={styles.detail}>
                  <Text style={styles.detailLable}>Gym Name:</Text>
                  <Text style={styles.detailValue}>
                    {profileDetails?.gymName}
                  </Text>
                </View>
                <View style={styles.detail}>
                  <Text style={styles.detailLable}>Plan:</Text>
                  <Text style={styles.detailValue}>
                    {profileDetails?.subscriptionPlan}
                  </Text>
                </View>
                <View style={styles.detail}>
                  <Text style={styles.detailLable}>Status:</Text>
                  <Text style={styles.detailValue}>
                    {profileDetails?.subscriptionStatus}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: theme.colors.primary,
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLable: {
    fontSize: 20,
    fontWeight: 500,
  },
  detailValue: {
    fontSize: 20,
    fontWeight: 500,
  },
});
