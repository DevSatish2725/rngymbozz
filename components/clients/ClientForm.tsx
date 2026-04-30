  import theme from "@/app/theme/theme";
  import AppButton from "@/components/AppButton";
  import AppInput from "@/components/AppInput";
  import React, { useState } from "react";
  import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";

function ClientForm({ clientId }: { clientId: string | undefined }) {
    const [clientDetails, setClientDetails] = useState({
      phone: "",
      email: "",
      address: "",
      height: "",
      weight: "",
      description: "",
    });
    const submitHandler = () => {};
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
              <AppInput label="Phone" />
              <AppInput label="Email" />
              <AppInput label="Address" />
              <AppInput label="Height(in cm)" />
              <AppInput label="Weight(in kg)" />
              <AppInput label="Description" multiline={true} numberOfLines={8} />
              <AppButton
                title={clientId ? "Update Client" : "Add Client"}
                onPress={submitHandler}
                customStyle={{
                  backgroundColor: theme.colors.primary,
                  color: "#fff",
                }}
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
