import theme from "@/app/theme/theme";
import storage from "@/config/storage";
import useAppDispatch from "@/hooks/use-dispatch";
import {
  getProfileDetail,
  updateProfileDetail,
} from "@/redux/features/profile/profileSlice";
import { getDaysBetweenDates } from "@/utils/getDaysBetweenDate";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import AppButton from "./AppButton";
import AppModal from "./ui/AppModal";
import { IconSymbol } from "./ui/icon-symbol";

const { width, height } = Dimensions.get("window");

export default function AppHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const profileDetails = useSelector(getProfileDetail);
  const dispatch = useAppDispatch();
  useEffect(() => {
    getProfileDetails();
  }, []);
  const getProfileDetails = async () => {
    const value = await storage.getItem("profileDetails");
    if (value) {
      const convertToNormalObj = JSON.parse(value);
      dispatch(updateProfileDetail(convertToNormalObj));
    }
  };
  const openModalHandler = () => {
    setIsModalOpen(true);
  };
  const closeModalHandler = () => {
    setIsModalOpen(false);
  };
  const goToBilling = () => {
    setIsModalOpen(false);
    router.push("/billing");
  };
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
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}>
              {profileDetails?.ownerName?.charAt(0)}
            </Text>
            {/* <IconSymbol size={28} name="person.fill" color={"#fff"} /> */}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomHeader}>
        <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
          <Text style={{ paddingLeft: 12, fontSize: 18, fontWeight: 600 }}>
            {profileDetails?.gymName}
          </Text>
          <TouchableOpacity onPress={openModalHandler}>
            <IconSymbol size={28} name="info.circle" color={"#feb179"} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingRight: 12,
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <Text style={styles.plan}>{profileDetails?.subscriptionPlan}</Text>
          <Text>
            {getDaysBetweenDates(new Date(), profileDetails?.trialEndDate)} days
          </Text>
        </View>
      </View>
      <AppModal isOpen={isModalOpen}>
        <View style={styles.modalContentArea}>
          <Text style={{ color: "#973c00", fontSize: 16, textAlign: "center" }}>
            Your free trial expires in 13 days. Upgrade to Pro to keep growing.
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}
          >
            <AppButton
              title="View Plans"
              onPress={goToBilling}
              customStyle={{
                backgroundColor: theme.colors.primary,
                color: "#fff",
                borderWidth: 1,
                borderColor: theme.colors.primary,
              }}
            />
            <AppButton
              title="Close"
              onPress={closeModalHandler}
              customStyle={{
                backgroundColor: "#fff",
                color: theme.colors.primary,
                borderWidth: 1,
                borderColor: theme.colors.primary,
              }}
            />
          </View>
        </View>
      </AppModal>
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
    paddingBottom: 12,
  },
  bottomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingLeft: 12,
  },
  title: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  profileContainer: {
    flexDirection: "row",
    gap: 7,
    paddingRight: 12,
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
    backgroundColor: "#fffbeb",
  },
  modalContentArea: {
    width: width * 0.8,
    height: height * 0.3,
    borderRadius: 10,
    padding: 12,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
    backgroundColor: "#fffbeb",
    justifyContent: "center",
    gap: 16,
  },
});
