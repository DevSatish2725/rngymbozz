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
  signupUser,
} from "../redux/features/auth/authSlice";
import authThunks from "../redux/features/auth/authThunks";
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
  // const [loading, setLoading] = useState(false);

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

  const validateIndianPhone = (phone: string) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phone);
  };
  const allowOnlyNumbers = (value: string) => {
    return value.replace(/\D/g, "");
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
            <View style={styles.container}>
              <View style={styles.contentContainer}>
                <Text style={styles.companyName}>GymBoss</Text>
                <View style={styles.offerContainer}>
                  <Text style={styles.offerTitle}>
                    14-day free trial. No card required.
                  </Text>
                </View>
                <Text style={styles.title}>Get Started with GymBoss</Text>
                <AppInput
                  label="Gym Name"
                  error={signupErrors.gymName}
                  value={signupDetails.gymName}
                  onChangeText={(text) => inputChangeHandler("gymName", text)}
                  type="text"
                  placeholder="PowerHouse Gym"
                />
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
                  label="Address"
                  error={signupErrors.address}
                  value={signupDetails.address}
                  onChangeText={(text) => inputChangeHandler("address", text)}
                  type="text"
                  placeholder="First Stree, City, State, ZIP"
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
                  title="Sign Up"
                  onPress={handleSignup}
                  loading={loading}
                />
                <View style={styles.footerContainer}>
                  <Text style={styles.footer}>Already have an account?</Text>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(clearAuthError());
                      Toast.hide();
                      router.push("/(auth)");
                    }}
                  >
                    <Text style={styles.link}>Login</Text>
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
  footer: {
    textAlign: "center",
    fontSize: 14,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
});
