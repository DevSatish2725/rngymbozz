import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Text, View } from "react-native";
import { AllClientsData, ClientListProps } from "../../types/clients";
import ClientCard from "./ClientCard";
function ClientsList({ clients, onPress, onEdit, onDelete }: ClientListProps) {
  return (
    <View style={{ flex: 1 }}>
      {clients.length ? (
        <FlashList
          data={clients}
          renderItem={({ item }: { item: AllClientsData }) => (
            <ClientCard
              client={item}
              onPress={onPress}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>No client found!</Text>
        </View>
      )}
    </View>
  );
}

export default ClientsList;
