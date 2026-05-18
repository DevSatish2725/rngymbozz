import theme from "@/app/theme/theme";
import storage from "@/config/storage";
import useAppDispatch from "@/hooks/use-dispatch";
import {
  closePlanWarning,
  showPlanWarningStateFn,
} from "@/redux/common/commonSlice";
import {
  getProfileDetail,
  updateProfileDetail,
} from "@/redux/features/profile/profileSlice";
import { getDaysBetweenDates } from "@/utils/common";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import AppButton from "./AppButton";
import { IconSymbol } from "./ui/icon-symbol";

export default function AppHeader({ pageName }: { pageName: string }) {
  const [showWarning, setShowWarning] = useState(true);
  const router = useRouter();
  const profileDetails = useSelector(getProfileDetail);
  const showPlanWarning = useSelector(showPlanWarningStateFn);
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

  const handleCloseWarning = () => {
    dispatch(closePlanWarning());
  };

  const goToBilling = () => {
    setShowWarning(false);
    router.push("/billing");
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.gymlogo}>
          <IconSymbol name={"building.2.fill"} size={22} color={"#fff"} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ gap: 4 }}>
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Text style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>
                {profileDetails?.ownerName}
              </Text>
              <Text style={{ fontSize: 12, color: "#fff" }}>
                {profileDetails?.subscriptionPlan}
              </Text>
            </View>
            <Text style={{ fontSize: 12, color: "#f1f1f1" }}>{pageName}</Text>
          </View>
          <TouchableOpacity
            style={styles.profileIconContainer}
            onPress={() => router.push("/profile")}
          >
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}>
              {profileDetails?.ownerName?.charAt(0)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {showPlanWarning ? (
        <View style={styles.warningContentArea}>
          <View style={styles.warningClockIcon}>
            <IconSymbol name={"clock.fill"} size={18} color={"#a03c07"} />
          </View>
          <View
            style={{
              gap: 12,
              width: 300,
            }}
          >
            {profileDetails.subscriptionPlan ? (
              <View>
                <Text
                  style={{
                    color: "#a03c07",
                    fontSize: 14,
                  }}
                >
                  Upgrade to keep access after plan ends.
                </Text>
              </View>
            ) : (
              <Text
                style={{
                  color: "#a03c07",
                  fontSize: 14,
                }}
              >
                {`Your free trial expires in ${getDaysBetweenDates(new Date(), profileDetails.trialEndDate)} days. Upgrade to Pro to keep growing.`}
              </Text>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <AppButton
                title={"View Plans"}
                onPress={goToBilling}
                customStyle={{
                  color: "#fff",
                  borderWidth: 1,
                  borderColor: "#000",
                }}
              />
              <TouchableOpacity
                onPress={handleCloseWarning}
                style={styles.warningCloseIcon}
              >
                <IconSymbol name={"xmark"} size={18} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    gap: 6,
  },
  gymlogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#9598ec9e",
    justifyContent: "center",
    alignItems: "center",
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    // Elevation for Android
    elevation: 5,
  },
  warningContentArea: {
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fdea9f",
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  warningClockIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#f7ae42",
    justifyContent: "center",
    alignItems: "center",
  },
  warningCloseIcon: {
    width: 40,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
  },
});
