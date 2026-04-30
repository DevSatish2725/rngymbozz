import AppHeader from "@/components/AppHeader";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          tabBarInactiveTintColor: Colors[colorScheme ?? "light"].icon,
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="square.grid.2x2" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="clients"
          options={{
            title: "Clients",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.2.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="billing"
          options={{
            title: "Billing",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="creditcard.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="payments"
          options={{
            title: "Payments",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="wallet.pass.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="attendance"
          options={{
            title: "Attendance",
            tabBarIcon: ({ color }) => (
              <IconSymbol
                size={28}
                name="checkmark.circle.fill"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="gearshape.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
