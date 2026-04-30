import theme from "@/app/theme/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import {
  AllClientsData,
  ClientCardProps,
  RightActionProps,
} from "../../types/clients";
import { IconSymbol } from "../ui/icon-symbol";

const STATUS_COLOR: Record<AllClientsData["status"], string> = {
  Active: "#16a34a",
  Expired: "#dc2626",
  INACTIVE: "#2690dc",
  "Expiring Soon": "#d97706",
};

const RightActions = ({ client, onEdit, onDelete }: RightActionProps) => (
  <View style={styles.swipeActions}>
    <TouchableOpacity
      style={[styles.swipeBtn, { backgroundColor: "#3b82f6" }]}
      onPress={() => onEdit(client)}
    >
      <IconSymbol size={20} name="pencil.circle.fill" color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.swipeBtn, { backgroundColor: "#ef4444" }]}
      onPress={() => onDelete(client)}
    >
      <IconSymbol size={20} name="trash" color="#fff" />
    </TouchableOpacity>
  </View>
);
export default function ClientCard({
  client,
  onPress,
  onEdit,
  onDelete,
}: ClientCardProps) {
  return (
    <ReanimatedSwipeable
      renderRightActions={() => (
        <RightActions client={client} onEdit={onEdit} onDelete={onDelete} />
      )}
      overshootRight={false}
    >
      <TouchableOpacity style={styles.card} onPress={() => onPress(client)}>
        <View style={styles.avatarRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {client.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{client.name}</Text>
            <Text style={styles.contact}>{client.phone}</Text>
          </View>
          <View
            style={[
              styles.badge,
              { backgroundColor: STATUS_COLOR[client.status] },
            ]}
          >
            <Text style={[styles.badgeText, { color: "#fff" }]}>
              {client.status}
            </Text>
          </View>
        </View>
        <Text style={styles.expiry}>
          Expires: {client.membershipEndDate ?? "N/A"}
        </Text>
      </TouchableOpacity>
    </ReanimatedSwipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: theme.colors.primary + "20",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  contact: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  expiry: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 8,
    marginLeft: 54,
  },
  swipeActions: {
    flexDirection: "row",
    marginVertical: 6,
    marginRight: 16,
  },
  swipeBtn: {
    width: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginLeft: 6,
  },
});
