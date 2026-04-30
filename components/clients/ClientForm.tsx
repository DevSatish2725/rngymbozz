import theme from "@/app/theme/theme";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import useAppDispatch from "@/hooks/use-dispatch";
import {
  allClientsStateFn,
  clearState,
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

function ClientForm({ clientId }: { clientId: string | undefined }) {
  const [clientDetails, setClientDetails] = useState({
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
    return () => {
      dispatch(clearState());
    };
  }, [newClientsData]);

  useEffect(() => {
    if (clientId && allClientsData.length) {
      const matchedClientData = allClientsData.find(
        (client: AllClientsData) => Number(client.id) === Number(clientId),
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
  }, []);

  useEffect(() => {
    if (updateClientData?.name) {
      Toast.show({
        type: "success",
        text1: `${updateClientData?.name} client updated.`,
      });
      dispatch(allClientsThunk());
      setClientDetails({
        name: "",
        phone: "",
        email: "",
        address: "",
        height: "",
        weight: "",
        description: "",
      });
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
    if (clientId) {
      dispatch(updateClientThunk({ payload: clientDetails, clientId }));
    } else {
      dispatch(addNewClientThunk({ payload: clientDetails }));
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
            />
            <AppInput
              label="Email"
              keyboardType="email-address"
              type="text"
              placeholder="owner@gym.com"
              value={clientDetails.email}
              onChangeText={(text) => onChangeTextHandler("email", text)}
            />
            <AppInput
              label="Address"
              placeholder="Street No-2"
              value={clientDetails.address}
              onChangeText={(text) => onChangeTextHandler("address", text)}
            />
            <AppInput
              label="Height(in cm)"
              placeholder="182"
              value={clientDetails.height}
              onChangeText={(text) => onChangeTextHandler("height", text)}
            />
            <AppInput
              label="Weight(in kg)"
              placeholder="70"
              value={clientDetails.weight}
              onChangeText={(text) => onChangeTextHandler("weight", text)}
            />
            <AppInput
              label="Description"
              multiline={true}
              numberOfLines={8}
              placeholder="Mr. India"
              value={clientDetails.description}
              onChangeText={(text) => onChangeTextHandler("description", text)}
            />
            <AppButton
              title={clientId ? "Update Client" : "Add Client"}
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
