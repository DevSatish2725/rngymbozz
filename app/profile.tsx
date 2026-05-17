import theme from "@/app/theme/theme";
import AppButton from "@/components/AppButton";
import InfoRow from "@/components/profile/InfoRow";
import ProfileShimmer from "@/components/profile/ProfileShimmer";
import { IconSymbol } from "@/components/ui/icon-symbol";
import storage from "@/config/storage";
import useAppDispatch from "@/hooks/use-dispatch";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";
import {
  getLoading,
  getProfileDetail,
} from "../redux/features/profile/profileSlice";
import { profileThunk } from "../redux/features/profile/profileThunks";
import { STATUS_CONFIG } from "@/constants/profile";
import { getInitials } from "@/utils/common";

export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const profileDetails = useSelector(getProfileDetail);
  const isLoading = useSelector(getLoading);
  const status = STATUS_CONFIG[profileDetails.subscriptionStatus];
  const initials = getInitials(profileDetails.ownerName);

  const handleLogout = async () => {
    setLoading(true);
    const response = new Promise((resolve) => {
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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.topbar}>
            <Text style={styles.topbarTitle}>Profile</Text>
            <AppButton
              title={"Logout"}
              onPress={handleLogout}
              customStyle={styles.logoutBtnTopbar}
              loading={loading}
              icon={"rectangle.portrait.and.arrow.right"}
              iconSize={18}
              textStyle={styles.logoutBtnTopbarText}
            />
            {/* <TouchableOpacity
              style={styles.logoutBtnTopbar}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <IconSymbol
                name="rectangle.portrait.and.arrow.right"
                size={15}
                color="#fff"
              />
              <Text style={styles.logoutBtnTopbarText}>Logout</Text>
            </TouchableOpacity> */}
          </View>
          {isLoading ? (
            <ProfileShimmer />
          ) : (
            <ScrollView
              contentContainerStyle={styles.scroll}
              showsVerticalScrollIndicator={false}
            >
              {/* ── Avatar + name + plan ── */}
              <View style={styles.avatarSection}>
                <View style={styles.avatarWrapper}>
                  <Text style={styles.avatarText}>{initials}</Text>
                </View>
                <Text style={styles.profileName}>
                  {profileDetails.ownerName}
                </Text>
                <View style={styles.planPill}>
                  <IconSymbol
                    name="crown.fill"
                    size={13}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.planPillText}>
                    {profileDetails.subscriptionPlan} Membership
                  </Text>
                </View>

                {/* Edit profile link */}
                {/* <TouchableOpacity
                  style={styles.editBtn}
                  onPress={onEditProfile}
                  activeOpacity={0.75}
                >
                  <IconSymbol
                    name="pencil"
                    size={13}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.editBtnText}>Edit profile</Text>
                </TouchableOpacity> */}
              </View>

              {/* ── Personal info card ── */}
              <View style={styles.card}>
                <Text style={styles.cardLabel}>Personal info</Text>

                <InfoRow
                  icon="person.fill"
                  iconBg="#eeedfe"
                  iconColor={theme.colors.primary}
                  label="Full name"
                >
                  <Text style={styles.infoValue}>
                    {profileDetails.ownerName}
                  </Text>
                </InfoRow>

                <InfoRow
                  icon="phone.fill"
                  iconBg="#e1f5ee"
                  iconColor="#0f6e56"
                  label="Phone number"
                >
                  <Text style={styles.infoValue}>{profileDetails.phone}</Text>
                </InfoRow>

                <InfoRow
                  icon="mappin.and.ellipse"
                  iconBg="#faeeda"
                  iconColor="#854f0b"
                  label="Address"
                >
                  <Text style={styles.infoValue}>{profileDetails.address}</Text>
                </InfoRow>
              </View>

              {/* ── Gym & membership card ── */}
              <View style={styles.card}>
                <Text style={styles.cardLabel}>Gym &amp; membership</Text>
                <InfoRow
                  icon="building.2.fill"
                  iconBg="#e6f1fb"
                  iconColor="#185fa5"
                  label="Gym name"
                >
                  <Text style={styles.infoValue}>{profileDetails.gymName}</Text>
                </InfoRow>

                <InfoRow
                  icon="crown.fill"
                  iconBg="#fbeaf0"
                  iconColor="#993556"
                  label="Plan"
                >
                  <Text style={styles.infoValue}>
                    {profileDetails.subscriptionPlan || "N/A"}
                  </Text>
                </InfoRow>

                <InfoRow
                  icon="checkmark.seal.fill"
                  iconBg="#e1f5ee"
                  iconColor="#0f6e56"
                  label="Status"
                >
                  <View
                    style={[styles.statusBadge, { backgroundColor: status.bg }]}
                  >
                    <View
                      style={[
                        styles.statusDot,
                        { backgroundColor: status.dot },
                      ]}
                    />
                    <Text style={[styles.statusText, { color: status.color }]}>
                      {profileDetails.subscriptionStatus}
                    </Text>
                  </View>
                </InfoRow>
              </View>

              {/* ── Logout button ── */}
              <AppButton
                title={"Logout"}
                onPress={handleLogout}
                customStyle={styles.logoutCard}
                loading={loading}
                icon={"rectangle.portrait.and.arrow.right"}
                textStyle={styles.logoutCardText}
                iconSize={18}
              />
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safe: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  // Top bar
  topbar: {
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  topbarTitle: {
    fontSize: 17,
    fontWeight: "500",
    color: "#fff",
  },
  logoutBtnTopbar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    color: "#fff",
  },
  logoutBtnTopbarText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#fff",
  },

  // Scroll
  scroll: {
    padding: 16,
    gap: 12,
  },

  // Avatar section
  avatarSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 8,
  },
  avatarWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#eeedfe",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  planPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#eeedfe",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  planPillText: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.primary,
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  editBtnText: {
    fontSize: 13,
    fontWeight: "500",
    color: theme.colors.primary,
  },

  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6b7280",
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },

  // Status badge
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },

  // Logout card
  logoutCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fee2e2",
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "#fca5a5",
    paddingVertical: 14,
    color: "#dc2626",
    fontSize: 15,
    fontWeight: "600",
  },
  logoutCardText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#dc2626",
  },
});
