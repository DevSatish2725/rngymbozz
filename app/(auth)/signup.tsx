import AppInput from "@/components/AppInput";
import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView, Platform, ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { signup } from "../redux/slices/authSlice";
import AppButton from "@/components/AppButton";

export default function Login() {
  const [signupDetails, setSignupDetails] = useState({
    ownerName: "",
    gymName: "",
    phoneNumber: "",
    address: "",
    email: "",
    password: "",
  });
  const [signupErrors, setSignupErrors] = useState({
    ownerName: "",
    gymName: "",
    phoneNumber: "",
    address: "",
    email: "",
    password: "",
  });
const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const inputChangeHandler = (key: string, text: string) => {
    setSignupErrors((prev) => ({ ...prev, [key]: "" }));
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

    if (!signupDetails.phoneNumber) {
      setSignupErrors((prev) => ({
        ...prev,
        phoneNumber: "This field is required.",
      }));
      hasPhoneError = true;
    } else if (signupDetails.phoneNumber) {
      if (!validateIndianPhone(signupDetails.phoneNumber)) {
        setSignupErrors((prev) => ({
          ...prev,
          phoneNumber: "Please enter a valid Indian phone number.",
        }));
        hasPhoneError = true;
      } else {
        setSignupErrors((prev) => ({ ...prev, phoneNumber: "" }));
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
        phoneNumber: "",
        address: "",
        email: "",
        password: "",
      });
      setLoading(true);
      const response = new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      });
      await response;
      dispatch(signup(signupDetails));
      setLoading(false);
      router.replace("/(auth)");
    }
  };
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
    <KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  style={{ flex: 1 }}
>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.logo}>GymBoss</Text>
      <Text style={styles.title}>14-day free trial. No card required.</Text>
      <AppInput
        label="Gym Name"
        error={signupErrors.gymName}
        value={signupDetails.gymName}
        onChangeText={(text) => inputChangeHandler("gymName", text)}
        type="text"
      />
      <AppInput
        label="Owner Name"
        error={signupErrors.ownerName}
        value={signupDetails.ownerName}
        onChangeText={(text) => inputChangeHandler("ownerName", text)}
        type="text"
      />
      <AppInput
        label="Phone"
        error={signupErrors.phoneNumber}
        value={signupDetails.phoneNumber}
        onChangeText={(text) => inputChangeHandler("phoneNumber", text)}
        type="text"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        autoComplete="tel"
        maxLength={10}
      />
      <AppInput
        label="Email"
        error={signupErrors.email}
        value={signupDetails.email}
        onChangeText={(text) => inputChangeHandler("email", text)}
        keyboardType="email-address"
        type="text"
      />
      <AppInput
        label="Address"
        error={signupErrors.address}
        value={signupDetails.address}
        onChangeText={(text) => inputChangeHandler("address", text)}
        type="text"
      />
      <AppInput
        label="Password"
        error={signupErrors.password}
        value={signupDetails.password}
        onChangeText={(text) => inputChangeHandler("password", text)}
        type="password"
              />
      <AppButton title="Sign Up" onPress={handleSignup} loading={loading} />
      <View style={styles.footerContainer}>
        <Text style={styles.footer}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
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
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    paddingHorizontal: 25,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
  },
  logo: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
  },
   title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
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
    marginBottom: 20,
    gap: 5,
  },
  footer: {
    textAlign: "center",
    fontSize: 14,
  },
  link: {
    color: "#4a90e2",
    fontWeight: "bold",
  },
});
