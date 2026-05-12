import theme from "@/app/theme/theme";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import useAppDispatch from "@/hooks/use-dispatch";
import {
  allClientsStateFn,
  clearState,
  clientIDStateFn,
  loadingStateFn,
  newClientDataStateFn,
  updateClientDataStateFn,
} from "@/redux/features/clients/clientsSlice";
import {
  addNewClientThunk,
  allClientsThunk,
  updateClientThunk,
} from "@/redux/features/clients/clientsThunk";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import { AllClientsData } from "@/types/clients";
import { validateEmail, validateIndianPhone } from "@/utils/regex";
import { router } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

function ClientForm() {
  const [clientDetails, setClientDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    height: "",
    weight: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    height: "",
    weight: "",
    description: "",
  });
  const newClientsData = useSelector(newClientDataStateFn);
  const allClientsData = useSelector(allClientsStateFn);
  const updateClientData = useSelector(updateClientDataStateFn);
  const clientID = useSelector(clientIDStateFn);

  const dispatch = useAppDispatch();

  const loading = useSelector(loadingStateFn);

  useEffect(() => {
    if (newClientsData?.name) {
      setClientDetails({
        name: "",
        phone: "",
        email: "",
        address: "",
        height: "",
        weight: "",
        description: "",
      });
      Toast.show({
        type: "success",
        text1: `${newClientsData?.name} client created.`,
      });
      dispatch(allClientsThunk());
    }
  }, [newClientsData]);

  useEffect(() => {
    if (clientID && allClientsData.length) {
      const matchedClientData = allClientsData.find(
        (client: AllClientsData) => Number(client.id) === Number(clientID),
      );
      if (matchedClientData !== -1) {
        const { name, phone, email, address, height, weight, description } =
          matchedClientData;
        setClientDetails({
          name,
          phone,
          email,
          address,
          height,
          weight,
          description,
        });
      }
    }
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (updateClientData?.name) {
      Toast.show({
        type: "success",
        text1: `${updateClientData?.name} client updated.`,
      });
      setClientDetails({
        name: "",
        phone: "",
        email: "",
        address: "",
        height: "",
        weight: "",
        description: "",
      });
      dispatch(allClientsThunk());
      router.back();
    }
  }, [updateClientData]);

  const onChangeTextHandler = (fieldType: string, value: string) => {
    setClientDetails((prev) => ({
      ...prev,
      [fieldType]: value,
    }));
  };

  const submitHandler = () => {
    let hasError = false;
    const errorObj = {
      name: "",
      phone: "",
      email: "",
      address: "",
      height: "",
      weight: "",
      description: "",
    };
    if (!clientDetails.name.trim()) {
      errorObj.name = "Name is required";
    } else if (clientDetails.name.trim()) {
      errorObj.name = "";
    }
    if (!clientDetails.phone.trim()) {
      errorObj.phone = "Phone number is required";
    } else if (!validateIndianPhone(clientDetails.phone.trim())) {
      errorObj.phone = "Invalid phone number";
    } else if (validateIndianPhone(clientDetails.phone.trim())) {
      errorObj.phone = "";
    }
    if (!clientDetails.email.trim()) {
      errorObj.email = "Email is required";
    } else if (!validateEmail(clientDetails.email.trim())) {
      errorObj.email = "Invalid email address";
    } else if (validateEmail(clientDetails.email.trim())) {
      errorObj.email = "";
    }
    if (!clientDetails.address.trim()) {
      errorObj.address = "Address is required";
    } else if (clientDetails.address.trim()) {
      errorObj.address = "";
    }
    if (!clientDetails.height.trim()) {
      errorObj.height = "Height is required";
    } else if (clientDetails.height.trim()) {
      errorObj.height = "";
    }
    if (!clientDetails.weight.trim()) {
      errorObj.weight = "Weight is required";
    } else if (clientDetails.weight.trim()) {
      errorObj.weight = "";
    }
    if (!clientDetails.description.trim()) {
      errorObj.description = "Description is required";
    } else if (clientDetails.description.trim()) {
      errorObj.description = "";
    }

    setErrors(errorObj);

    for (let key in errorObj) {
      if (errorObj[key as keyof typeof errorObj]) {
        hasError = true;
        break;
      }
    }

    if (!hasError) {
      if (clientID) {
        dispatch(
          updateClientThunk({ payload: clientDetails, clientId: clientID }),
        );
      } else {
        dispatch(addNewClientThunk({ payload: clientDetails }));
      }
    }
  };
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1 }}>
            <AppInput
              label="Full Name"
              placeholder="Test sharma"
              value={clientDetails.name}
              onChangeText={(text) => onChangeTextHandler("name", text)}
              error={errors.name}
            />
            <AppInput
              label="Phone"
              type="text"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              autoComplete="tel"
              maxLength={10}
              placeholder="9999999999"
              value={clientDetails.phone}
              onChangeText={(text) => onChangeTextHandler("phone", text)}
              error={errors.phone}
            />
            <AppInput
              label="Email"
              keyboardType="email-address"
              type="text"
              placeholder="owner@gym.com"
              value={clientDetails.email}
              onChangeText={(text) => onChangeTextHandler("email", text)}
              error={errors.email}
            />
            <AppInput
              label="Address"
              placeholder="Street No-2"
              value={clientDetails.address}
              onChangeText={(text) => onChangeTextHandler("address", text)}
              error={errors.address}
            />
            <AppInput
              label="Height(in cm)"
              placeholder="182"
              keyboardType="number-pad"
              value={clientDetails.height}
              onChangeText={(text) => onChangeTextHandler("height", text)}
              error={errors.height}
            />
            <AppInput
              label="Weight(in kg)"
              placeholder="70"
              keyboardType="number-pad"
              value={clientDetails.weight}
              onChangeText={(text) => onChangeTextHandler("weight", text)}
              error={errors.weight}
            />
            <AppInput
              label="Description"
              multiline={true}
              numberOfLines={8}
              placeholder="Mr. India"
              value={clientDetails.description}
              onChangeText={(text) => onChangeTextHandler("description", text)}
              error={errors.description}
            />
            <AppButton
              title={clientID ? "Update Client" : "Add Client"}
              onPress={submitHandler}
              customStyle={{
                backgroundColor: theme.colors.primary,
                color: "#fff",
              }}
              loading={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ClientForm;

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
});
