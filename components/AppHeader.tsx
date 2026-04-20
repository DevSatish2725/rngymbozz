import {
  getProfileDetail,
  updateProfileDetail,
} from "@/app/redux/features/profile/profileSlice";
import theme from "@/app/theme/theme";
import storage from "@/config/storage";
import useAppDispatch from "@/hooks/use-dispatch";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { IconSymbol } from "./ui/icon-symbol";
import { getDaysBetweenDates } from "@/utils/getDaysBetweenDate";
export default function AppHeader() {
  const router = useRouter();
  const profileDetails = useSelector(getProfileDetail);
  const dispatch = useAppDispatch();
  const getProfileDetails = async () => {
    const value = await storage.getItem("profileDetails");
    if (value) {
      const convertToNormalObj = JSON.parse(value);
      dispatch(updateProfileDetail(convertToNormalObj));
    }
  };
  useEffect(() => {
    getProfileDetails();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <View style={styles.iconContainer}>
          <IconSymbol
            size={28}
            name="square.grid.2x2"
            color={theme.colors.primary}
          />
          <Text style={styles.title}>GymBoss</Text>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.profileTextContainer}>
            <Text style={{ fontSize: 18, fontWeight: 600 }}>
              {profileDetails?.ownerName}
            </Text>
            <Text style={{ color: "gray" }}>{profileDetails?.phone}</Text>
          </View>
          <TouchableOpacity
            style={styles.profileIconContainer}
            onPress={() => router.push("/profile")}
          >
            <IconSymbol size={28} name="person.fill" color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomHeader}>
        <Text style={{paddingLeft: 12, fontSize: 18, fontWeight: 600}}>{profileDetails?.gymName}</Text>
        <View style={{paddingRight: 12, flexDirection:"row", gap: 8, alignItems: "center"}}>
          <Text style={styles.plan}>{profileDetails?.subscriptionPlan}</Text>
          <Text>{getDaysBetweenDates(new Date(), profileDetails?.trialEndDate)} days</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#e1e1e1",
    borderBottomWidth: 1,
    paddingBottom: 12
  },
  bottomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingLeft: 12
  },
  title: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  profileContainer: {
    flexDirection: "row",
    gap: 7,
    paddingRight: 12
  },
  profileTextContainer: {
    alignItems: "flex-end",
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
    // Elevation for Android
    elevation: 5,
  },
  plan: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#fef3c6",
    padding: 6,
    color: "#bb4d00",
    backgroundColor: "#fffbeb"
  }
});
