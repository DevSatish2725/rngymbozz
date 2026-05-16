import theme from "@/app/theme/theme";
import { TimeOption } from "@/types/payment";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "../ui/icon-symbol";

interface Props {
  onSuccess: (option: string) => void;
  onCancel: () => void;
  timeOption: TimeOption[];
  selectedTime: string;
}

const TimeFilterBottomSheet = forwardRef<BottomSheet, Props>(
  ({ onSuccess, onCancel, timeOption, selectedTime }, ref) => {
    const snapPoints = useMemo(() => ["52%"], []);
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.4}
        />
      ),
      [],
    );
    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.handle}
        backgroundStyle={styles.sheetBg}
      >
        <BottomSheetView style={styles.sheetContent}>
          {/* Sheet header */}
          <View style={styles.sheetHeader}>
            <View>
              <Text style={styles.sheetTitle}>Filter by Time</Text>
              <Text style={styles.sheetSub}>
                Select a date range for payments
              </Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onCancel}>
              <IconSymbol name="xmark" size={14} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Options */}
          <View style={styles.optionsList}>
            {timeOption.map((option, index) => {
              const isSelected = option.value === selectedTime;
              const isLast = index === timeOption.length - 1;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionRow,
                    isSelected && styles.optionRowSelected,
                    !isLast && styles.optionBorder,
                  ]}
                  onPress={() => onSuccess(option.value)}
                  activeOpacity={0.7}
                >
                  {/* Icon */}
                  <View
                    style={[
                      styles.optionIcon,
                      isSelected
                        ? styles.optionIconSelected
                        : styles.optionIconDefault,
                    ]}
                  >
                    <IconSymbol
                      name={option.icon}
                      size={17}
                      color={isSelected ? "#fff" : "#6b7280"}
                    />
                  </View>

                  {/* Label + description */}
                  <View style={styles.optionText}>
                    <Text
                      style={[
                        styles.optionLabel,
                        isSelected && styles.optionLabelSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                    <Text style={styles.optionDesc}>{option.description}</Text>
                  </View>

                  {/* Checkmark */}
                  {isSelected && (
                    <IconSymbol
                      name="checkmark.circle.fill"
                      size={20}
                      color="#4f46e5"
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

TimeFilterBottomSheet.displayName = "TimeFilterBottomSheet";

export default TimeFilterBottomSheet;

const styles = StyleSheet.create({
  // Trigger
  trigger: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#eeedfe",
    borderWidth: 1,
    borderColor: "#c7d2fe",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  triggerText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.primary,
  },

  // Sheet
  sheetBg: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    backgroundColor: "#d1d5db",
    width: 36,
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },

  // Sheet header
  sheetHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 20,
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 3,
  },
  sheetSub: {
    fontSize: 13,
    color: "#6b7280",
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },

  // Options list
  optionsList: {
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },
  optionRowSelected: {
    backgroundColor: "#f5f3ff",
  },
  optionBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#f3f4f6",
  },

  // Option icon
  optionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  optionIconDefault: {
    backgroundColor: "#f3f4f6",
  },
  optionIconSelected: {
    backgroundColor: theme.colors.primary,
  },

  // Option text
  optionText: {
    flex: 1,
    gap: 2,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  optionLabelSelected: {
    fontWeight: "700",
    color: theme.colors.primary,
  },
  optionDesc: {
    fontSize: 12,
    color: "#9ca3af",
  },
});
