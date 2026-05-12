import ClientForm from "@/components/clients/ClientForm";
import { clientIDStateFn } from "@/redux/features/clients/clientsSlice";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function AddClient() {
  const clientID = useSelector(clientIDStateFn);
  return (
    <>
      <Stack.Screen
        options={{
          title: clientID ? "Edit Client" : "Add Client",
        }}
      />
      <ClientForm />
    </>
  );
}

const styles = StyleSheet.create({});
