import { Stack } from "expo-router";

export default function ClientsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#5B5FEF", // header background
        },
        headerTintColor: "#fff", // back arrow + title color
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "600",
        },
        headerTitleAlign: "left", // "left" | "center"
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Clients", headerShown: false }}
      />
      <Stack.Screen name="new" options={{ title: "Add Client" }} />
      <Stack.Screen name="[id]/edit" options={{ title: "Edit Client" }} />
      <Stack.Screen name="[id]" options={{ title: "Client Details" }} />
    </Stack>
  );
}
