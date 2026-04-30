import ClientForm from "@/components/clients/ClientForm";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function AddClient() {
  const { id } = useLocalSearchParams();
  const isEditing = id;
  console.log("id", id);
  return (
    <>
      <Stack.Screen
        options={{
          title: isEditing ? "Edit Client" : "Add Client",
        }}
      />
      <ClientForm clientId={isEditing ? id : undefined} />
    </>
  );
}

const styles = StyleSheet.create({});
