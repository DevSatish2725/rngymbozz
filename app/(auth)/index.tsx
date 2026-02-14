import AppInput from "@/components/AppInput";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loading, loadingState, login } from "../redux/slices/authSlice";

export default function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });

  const loadingValue = useSelector(loadingState);
  const dispatch = useDispatch();

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
      dispatch(loading(true));
      const response = new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      });
      await response;
      dispatch(login(loginDetails));
      dispatch(loading(false));
      router.replace("/(tabs)");
    }
    console.log("Login details:", loginDetails);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GymBoss</Text>
      <Text style={styles.title}>Welcome Back</Text>
      <AppInput
        label="Email"
        error={loginErrors.email}
        value={loginDetails.email}
        onChangeText={(text) => inputChangeHandler("email", text)}
        keyboardType="email-address"
        type="text"
      />
      <AppInput
        label="Password"
        error={loginErrors.password}
        value={loginDetails.password}
        onChangeText={(text) => inputChangeHandler("password", text)}
        type="password"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loadingValue ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Text style={styles.footer}>New Gym Owner?</Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.link}>Start 14-day free trial?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 26,
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
