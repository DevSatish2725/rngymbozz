import theme from "@/app/theme/theme";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
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
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              <Text style={styles.companyName}>GymBoss</Text>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>Welcome Back</Text>
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
                <AppButton
                  title="Login"
                  onPress={handleLogin}
                  loading={loading}
                />
                <View style={styles.footerContainer}>
                  <Text style={styles.footer}>New Gym Owner?</Text>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(clearAuthError());
                      Toast.hide();
                      router.push("/signup");
                    }}
                  >
                    <Text style={styles.link}>Start 14-day free trial?</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: theme.spacing.md,
  },
  companyName: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: theme.colors.primary,
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
  footer: {
    textAlign: "center",
    fontSize: 14,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
});
