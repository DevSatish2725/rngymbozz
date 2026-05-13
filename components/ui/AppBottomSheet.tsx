import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  onSuccess: () => void;
  onCancel: () => void;
  title?: string;
  subtitle?: string;
  successBtnText?: string;
  cancelBtnText?: string;
};

const AppBottomSheet = forwardRef<BottomSheet, Props>(
  (
    { onSuccess, onCancel, title, subtitle, successBtnText, cancelBtnText },
    ref,
  ) => {
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          onPress={onCancel} // close on outside click
        />
      ),
      [onCancel],
    );
    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={["30%"]}
        enablePanDownToClose
        onClose={onCancel}
        backdropComponent={renderBackdrop} // 👈 add this
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.handle}
        style={{ zIndex: 999 }} // 👈
        containerStyle={{ zIndex: 999 }}
      >
        <BottomSheetView style={styles.container}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          <TouchableOpacity style={styles.deleteBtn} onPress={onSuccess}>
            <Text style={styles.deleteBtnText}>{successBtnText}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
            <Text style={styles.cancelBtnText}>{cancelBtnText}</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

AppBottomSheet.displayName = "AppBottomSheet";

export default AppBottomSheet;

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
