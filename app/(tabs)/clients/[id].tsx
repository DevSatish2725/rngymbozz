import ClientForm from "@/components/clients/ClientForm";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function EditClient() {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return <ClientForm clientId={id} />;
}

const styles = StyleSheet.create({});
