import theme from "@/app/theme/theme";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import { IconSymbol } from "@/components/ui/icon-symbol";
import storage from "@/config/storage";
import useAppDispatch from "@/hooks/use-dispatch";
import {
  allowOnlyNumbers,
  validateEmail,
  validateIndianPhone,
} from "@/utils/regex";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import {
  authError,
  clearAuthError,
  loadingState,
  signupUser,
} from "../../redux/features/auth/authSlice";
import authThunks from "../../redux/features/auth/authThunks";

const SectionLabel = ({ label }: { label: string }) => (
  <Text style={styles.sectionLabel}>{label}</Text>
);

const Divider = () => <View style={styles.divider} />;

export default function Signup() {
  const [signupDetails, setSignupDetails] = useState({
    ownerName: "",
    gymName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });
  const [signupErrors, setSignupErrors] = useState({
    ownerName: "",
    gymName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const loading = useSelector(loadingState);
  const user = useSelector(signupUser);
  const error = useSelector(authError);

  const inputChangeHandler = (key: string, text: string) => {
    setSignupErrors((prev) => ({ ...prev, [key]: "" }));
    if (key === "phone") {
      text = allowOnlyNumbers(text);
    }
    setSignupDetails((prev) => ({ ...prev, [key]: text }));
  };

  const validatePassword = (password: string) => {
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[@$!%*?&]/.test(password)) {
      return "Password must contain at least one special character";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }

    return null;
  };

  const handleSignup = async () => {
    let hasEmailError = false;
    let hasPasswordError = false;
    let hasPhoneError = false;
    if (!signupDetails.email) {
      setSignupErrors((prev) => ({
        ...prev,
        email: "This field is required.",
      }));
      hasEmailError = true;
    } else if (signupDetails.email) {
      if (!validateEmail(signupDetails.email)) {
        setSignupErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address.",
        }));
        hasEmailError = true;
      } else {
        setSignupErrors((prev) => ({ ...prev, email: "" }));
        hasEmailError = false;
      }
    }
    if (!signupDetails.password) {
      setSignupErrors((prev) => ({
        ...prev,
        password: "This field is required.",
      }));
    } else if (signupDetails.password) {
      const passwordError = validatePassword(signupDetails.password);
      if (passwordError) {
        setSignupErrors((prev) => ({ ...prev, password: passwordError }));
        hasPasswordError = true;
      } else {
        setSignupErrors((prev) => ({ ...prev, password: "" }));
        hasPasswordError = false;
      }
    }

    if (!signupDetails.phone) {
      setSignupErrors((prev) => ({
        ...prev,
        phone: "This field is required.",
      }));
      hasPhoneError = true;
    } else if (signupDetails.phone) {
      if (!validateIndianPhone(signupDetails.phone)) {
        setSignupErrors((prev) => ({
          ...prev,
          phone: "Please enter a valid Indian phone number.",
        }));
        hasPhoneError = true;
      } else {
        setSignupErrors((prev) => ({ ...prev, phone: "" }));
        hasPhoneError = false;
      }
    }
    if (!signupDetails.ownerName) {
      setSignupErrors((prev) => ({
        ...prev,
        ownerName: "This field is required.",
      }));
    }

    if (!signupDetails.gymName) {
      setSignupErrors((prev) => ({
        ...prev,
        gymName: "This field is required.",
      }));
    }
    if (!signupDetails.address) {
      setSignupErrors((prev) => ({
        ...prev,
        address: "This field is required.",
      }));
    }

    if (
      !hasEmailError &&
      !hasPasswordError &&
      !hasPhoneError &&
      signupDetails.ownerName &&
      signupDetails.gymName &&
      signupDetails.address
    ) {
      setSignupErrors({
        ownerName: "",
        gymName: "",
        phone: "",
        address: "",
        email: "",
        password: "",
      });
      dispatch(clearAuthError());
      await storage.removeItem("token");
      await dispatch(authThunks.signup(signupDetails));
    }
  };

  useEffect(() => {
    if (user) {
      router.replace("/(auth)");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
    }
  }, [error]);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.hero}>
              {/* Logo */}
              <View style={styles.logoRow}>
                <View style={styles.logoIcon}>
                  <IconSymbol
                    name="square.grid.2x2.fill"
                    size={20}
                    color="#fff"
                  />
                </View>
                <Text style={styles.logoName}>GymBoss</Text>
              </View>

              {/* Trial pill */}
              <View style={styles.trialPill}>
                <IconSymbol name="gift.fill" size={13} color="#fff" />
                <Text style={styles.trialPillText}>
                  14-day free trial · No card required
                </Text>
              </View>

              <Text style={styles.heroTitle}>Create your gym account</Text>
              <Text style={styles.heroSub}>Get started in under 2 minutes</Text>
            </View>
            <View style={styles.form}>
              <SectionLabel label="Gym details" />
              <AppInput
                label="Gym Name"
                error={signupErrors.gymName}
                value={signupDetails.gymName}
                onChangeText={(text) => inputChangeHandler("gymName", text)}
                type="text"
                placeholder="PowerHouse Gym"
              />
              <AppInput
                label="Address"
                error={signupErrors.address}
                value={signupDetails.address}
                onChangeText={(text) => inputChangeHandler("address", text)}
                type="text"
                placeholder="First Stree, City, State, ZIP"
              />
              <Divider />

              {/* Owner details section */}
              <SectionLabel label="Owner details" />
              <AppInput
                label="Owner Name"
                error={signupErrors.ownerName}
                value={signupDetails.ownerName}
                onChangeText={(text) => inputChangeHandler("ownerName", text)}
                type="text"
                placeholder="John Doe"
              />
              <AppInput
                label="Phone Number"
                error={signupErrors.phone}
                value={signupDetails.phone}
                onChangeText={(text) => inputChangeHandler("phone", text)}
                type="text"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                autoComplete="tel"
                maxLength={10}
                placeholder="9999999999"
              />
              <AppInput
                label="Email"
                error={signupErrors.email}
                value={signupDetails.email}
                onChangeText={(text) => inputChangeHandler("email", text)}
                keyboardType="email-address"
                type="text"
                placeholder="owner@gym.com"
              />
              <AppInput
                label="Password"
                error={signupErrors.password}
                value={signupDetails.password}
                onChangeText={(text) => inputChangeHandler("password", text)}
                type="password"
                placeholder="abcdG12@"
              />
              <AppButton
                title="Start free trial"
                onPress={handleSignup}
                loading={loading}
                customStyle={styles.signupBtn}
                textStyle={styles.signupBtnText}
              />
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => {
                                dispatch(clearAuthError());
                                Toast.hide();
                                router.push("/");
                              }} activeOpacity={0.7}>
                <Text style={styles.footerLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  // Hero
  hero: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 28,
    paddingTop: 44,
    paddingBottom: 32,
    gap: 8,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  logoIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  trialPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  trialPillText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#fff",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    lineHeight: 30,
  },
  heroSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
  },
  // Form
  form: {
    backgroundColor: "#f3f4f6",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  // Section label
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6b7280",
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: 4,
    textTransform: "uppercase",
  },

  // Divider
  divider: {
    height: 0.5,
    backgroundColor: "#e5e7eb",
    marginVertical: 4,
    marginBottom: 18,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
  },
  companyName: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
    color: theme.colors.primary,
  },
  offerContainer: {
    backgroundColor: theme.colors.primaryLight,
    padding: theme.spacing.xs,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  offerTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: theme.colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 13,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    gap: 5,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  signupBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 8,
    marginBottom: 4,
  },
  signupBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  // Footer
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingVertical: 24,
    borderTopWidth: 0.5,
    borderTopColor: "#e5e7eb",
  },
  footerText: {
    fontSize: 13,
    color: "#6b7280",
  },
  footerLink: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.primary,
  },
});
