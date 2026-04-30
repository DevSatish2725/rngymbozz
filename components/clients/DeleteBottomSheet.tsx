import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { forwardRef, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  clientName: string;
  onDelete: () => void;
  onCancel: () => void;
};

const DeleteBottomSheet = forwardRef<BottomSheet, Props>(
  ({ clientName, onDelete, onCancel }, ref) => {
    return (
      <BottomSheet
        ref={ref}
        index={-1}                        // hidden by default
        snapPoints={["30%"]}
        enablePanDownToClose
        onClose={onCancel}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.handle}
      >
        <BottomSheetView style={styles.container}>
          <Text style={styles.title}>Delete {clientName}?</Text>
          <Text style={styles.subtitle}>
            All membership data and payment history will be permanently removed.
          </Text>

          <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
            <Text style={styles.deleteBtnText}>Delete permanently</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default DeleteBottomSheet;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  handle: {
    backgroundColor: "#d1d5db",
    width: 36,
  },
  container: {
    padding: 24,
    paddingTop: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 24,
  },
  deleteBtn: {
    backgroundColor: "#dc2626",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginBottom: 10,
  },
  deleteBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  cancelBtn: {
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
  },
  cancelBtnText: {
    fontSize: 15,
    color: "#374151",
  },
});