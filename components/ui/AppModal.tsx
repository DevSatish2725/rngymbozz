import theme from "@/app/theme/theme";
import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import AppButton from "../AppButton";
import { ReactNode } from "react";


const AppModal = ({
  isOpen,
  children
}: {
  isOpen: boolean;
  children: ReactNode
}) => {
  return (
    <Modal visible={isOpen} transparent animationType="slide">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {children}
      </View>
    </Modal>
  );
};

export default AppModal;
