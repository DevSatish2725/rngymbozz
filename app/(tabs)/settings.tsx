import AppButton from "@/components/AppButton";
import AppHeader from "@/components/AppHeader";
import AppInput from "@/components/AppInput";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedView } from "@/components/themed-view";
import { getProfileDetail } from "@/redux/features/profile/profileSlice";
import { validateEmail, validateIndianPhone } from "@/utils/regex";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import theme from "../theme/theme";

const Settings = () => {
  const [inputFields, setInputFields] = useState({
    ownerName: "",
    gymName: "",
    email: "",
    phoneNo: "",
    currentPassword: "",
    newPassword: "",
  });

  const [inputFieldsError, setInputFieldsError] = useState({
    ownerName: "",
    gymName: "",
    email: "",
    phoneNo: "",
    currentPassword: "",
    newPassword: "",
  });

  const profileDetails = useSelector(getProfileDetail);

  useEffect(() => {
    const { ownerName, gymName, phone } = profileDetails;
    const obj = {
      ownerName,
      gymName,
      phoneNo: phone,
    };
    setInputFields((prev) => ({ ...prev, ...obj }));
  }, [profileDetails]);

  const onChangeHandler = (text: string, fieldType: string) => {
    setInputFields((prev) => ({
      ...prev,
      [fieldType]: text,
    }));
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

  const handleSubmit = () => {
    let hasEmailError = false;
    let hasCurrentPasswordError = false;
    let hasNewPasswordError = false;
    let hasPhoneError = false;
    if (!inputFields.email) {
      setInputFieldsError((prev) => ({
        ...prev,
        email: "This field is required.",
      }));
      hasEmailError = true;
    } else if (inputFields.email) {
      if (!validateEmail(inputFields.email)) {
        setInputFieldsError((prev) => ({
          ...prev,
          email: "Please enter a valid email address.",
        }));
        hasEmailError = true;
      } else {
        setInputFieldsError((prev) => ({ ...prev, email: "" }));
        hasEmailError = false;
      }
    }
    if (!inputFields.phoneNo) {
      setInputFieldsError((prev) => ({
        ...prev,
        phone: "This field is required.",
      }));
      hasPhoneError = true;
    } else if (inputFields.phoneNo) {
      if (!validateIndianPhone(inputFields.phoneNo)) {
        setInputFieldsError((prev) => ({
          ...prev,
          phone: "Please enter a valid Indian phone number.",
        }));
        hasPhoneError = true;
      } else {
        setInputFieldsError((prev) => ({ ...prev, phone: "" }));
        hasPhoneError = false;
      }
    }
    if (!inputFields.ownerName) {
      setInputFieldsError((prev) => ({
        ...prev,
        ownerName: "This field is required.",
      }));
    }

    if (!inputFields.gymName) {
      setInputFieldsError((prev) => ({
        ...prev,
        gymName: "This field is required.",
      }));
    }

    if (!inputFields.currentPassword) {
      setInputFieldsError((prev) => ({
        ...prev,
        currentPassword: "This field is required.",
      }));
    } else if (inputFields.currentPassword) {
      const passwordError = validatePassword(inputFields.currentPassword);
      if (passwordError) {
        setInputFieldsError((prev) => ({
          ...prev,
          currentPassword: passwordError,
        }));
        hasCurrentPasswordError = true;
      } else {
        setInputFieldsError((prev) => ({ ...prev, currentPassword: "" }));
        hasCurrentPasswordError = false;
      }
    }

    if (!inputFields.newPassword) {
      setInputFieldsError((prev) => ({
        ...prev,
        newPassword: "This field is required.",
      }));
    } else if (inputFields.newPassword) {
      const passwordError = validatePassword(inputFields.newPassword);
      if (passwordError) {
        setInputFieldsError((prev) => ({
          ...prev,
          newPassword: passwordError,
        }));
        hasNewPasswordError = true;
      } else {
        setInputFieldsError((prev) => ({ ...prev, newPassword: "" }));
        hasNewPasswordError = false;
      }
    }

    if (
      !hasEmailError &&
      !hasCurrentPasswordError &&
      !hasNewPasswordError &&
      !hasPhoneError &&
      inputFields.ownerName &&
      inputFields.gymName
    ) {
      setInputFieldsError({
        ownerName: "",
        gymName: "",
        phoneNo: "",
        email: "",
        currentPassword: "",
        newPassword: "",
      });
      console.log("call api here...");
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <AppHeader pageName="Settings"/>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <AppInput
            label={"Gym Name"}
            placeholder="Gold..."
            value={inputFields.gymName}
            error={inputFieldsError.gymName}
            onChangeText={(text) => onChangeHandler(text, "gymName")}
          />
          <AppInput
            label={"Owner Name"}
            placeholder="John..."
            value={inputFields.ownerName}
            error={inputFieldsError.ownerName}
            onChangeText={(text) => onChangeHandler(text, "ownerName")}
            type="text"
          />
          <AppInput
            label={"Email"}
            placeholder="john@gmail.com..."
            value={inputFields.email}
            error={inputFieldsError.email}
            onChangeText={(text) => onChangeHandler(text, "email")}
            keyboardType="email-address"
            type="text"
          />
          <AppInput
            label={"Phone Number"}
            placeholder="9999999999"
            value={inputFields.phoneNo}
            error={inputFieldsError.phoneNo}
            onChangeText={(text) => onChangeHandler(text, "phoneNo")}
            type="text"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            autoComplete="tel"
            maxLength={10}
          />
          <AppInput
            label="Current Password"
            value={inputFields.currentPassword}
            error={inputFieldsError.currentPassword}
            onChangeText={(text) => onChangeHandler(text, "currentPassword")}
            type="password"
            placeholder="abcdG12@"
          />
          <AppInput
            label="New Password"
            value={inputFields.newPassword}
            error={inputFieldsError.newPassword}
            onChangeText={(text) => onChangeHandler(text, "newPassword")}
            type="password"
            placeholder="abcdG12@"
          />
          <AppButton
            title={"Save Profile"}
            onPress={handleSubmit}
            customStyle={{
              backgroundColor: theme.colors.primary,
              color: "#fff",
            }}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
