import theme from "@/app/theme/theme";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import { IconSymbol } from "@/components/ui/icon-symbol";
import storage from "@/config/storage";
import useAppDispatch from "@/hooks/use-dispatch";
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
  user,
} from "../../redux/features/auth/authSlice";
import authThunks from "../../redux/features/auth/authThunks";
import { getProfileDetail } from "../../redux/features/profile/profileSlice";
import { profileThunk } from "../../redux/features/profile/profileThunks";

export default function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const loading = useSelector(loadingState);
  const userDetails = useSelector(user);
  const error = useSelector(authError);
  const profileDetails = useSelector(getProfileDetail);
  const inputChangeHandler = (key: string, text: string) => {
    if (key === "email") {
      setLoginErrors((prev) => ({ ...prev, email: "" }));
    } else if (key === "password") {
      setLoginErrors((prev) => ({ ...prev, password: "" }));
    }
    setLoginDetails((prev) => ({ ...prev, [key]: text }));
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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

  const handleLogin = async () => {
    let hasEmailError = false;
    let hasPasswordError = false;
    if (!loginDetails.email) {
      setLoginErrors((prev) => ({
        ...prev,
        email: "This field is required.",
      }));
      hasEmailError = true;
    } else if (loginDetails.email) {
      if (!validateEmail(loginDetails.email)) {
        setLoginErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address.",
        }));
        hasEmailError = true;
      } else {
        setLoginErrors((prev) => ({ ...prev, email: "" }));
        hasEmailError = false;
      }
    }
    if (!loginDetails.password) {
      setLoginErrors((prev) => ({
        ...prev,
        password: "This field is required.",
      }));
    } else if (loginDetails.password) {
      const passwordError = validatePassword(loginDetails.password);
      if (passwordError) {
        setLoginErrors((prev) => ({ ...prev, password: passwordError }));
        hasPasswordError = true;
      } else {
        setLoginErrors((prev) => ({ ...prev, password: "" }));
        hasPasswordError = false;
      }
    }

    if (!hasEmailError && !hasPasswordError) {
      setLoginErrors({ email: "", password: "" });
      dispatch(clearAuthError());
      await dispatch(authThunks.login(loginDetails));
    }
  };

  const fetchProfileDetails = async (token: string) => {
    // Save token securely
    await storage.setItem("token", token);
    await dispatch(profileThunk());
    router.replace("/(tabs)");
  };

  const onForgotPassword = () => {};

  useEffect(() => {
    if (userDetails && userDetails.token) {
      fetchProfileDetails(userDetails.token);
    }
  }, [userDetails]);

  useEffect(() => {
    if (Object.keys(profileDetails)) {
      storage.setItem("profileDetails", JSON.stringify(profileDetails));
    }
  }, [profileDetails]);

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
          style={styles.kav}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.hero}>
              {/* Logo row */}
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
              <Text style={styles.heroTitle}>Welcome back</Text>
              <Text style={styles.heroSub}>Sign in to manage your gym</Text>
            </View>
            <View style={styles.form}>
              <AppInput
                label="Email Address"
                error={loginErrors.email}
                value={loginDetails.email}
                onChangeText={(text) => inputChangeHandler("email", text)}
                keyboardType="email-address"
                type="text"
                placeholder="owner@gym.com"
              />
              <AppInput
                label="Password"
                error={loginErrors.password}
                value={loginDetails.password}
                onChangeText={(text) => inputChangeHandler("password", text)}
                type="password"
                placeholder="abcdG12@"
              />
              <TouchableOpacity
                style={styles.forgotBtn}
                onPress={onForgotPassword}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
              <AppButton
                title="Login"
                onPress={handleLogin}
                loading={loading}
                customStyle={styles.loginBtn}
                textStyle={styles.textStyle}
              />
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>New Gym Owner? </Text>
              <TouchableOpacity
                onPress={() => {
                  dispatch(clearAuthError());
                  Toast.hide();
                  router.push("/signup");
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.footerLink}>Start 14-day free trial</Text>
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
  kav: {
    flex: 1,
  },
  hero: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 36,
    gap: 6,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
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
  heroTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    lineHeight: 34,
  },
  heroSub: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginTop: -4,
    marginBottom: 24,
    padding: 4,
  },
  forgotText: {
    fontSize: 13,
    color: theme.colors.primary,
    fontWeight: "500",
  },
  companyName: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: theme.colors.primary,
  },
  form: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 28,
    gap: 0,
  },
  contentContainer: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    color: theme.colors.textPrimary,
  },
  button: {
    backgroundColor: "#4a90e2",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
    gap: 5,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  loginBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
  },
  textStyle: {
    color: "#fff",
  },
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
