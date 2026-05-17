import theme from "@/app/theme/theme";
import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { IconSymbol } from "./ui/icon-symbol";
import { SFSymbols7_0 } from "sf-symbols-typescript";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  width?: number;
  customStyle?: {
    backgroundColor?: string;
    color?: string;
    borderWidth?: number;
    borderColor?: string;
  };
  icon?: SFSymbols7_0;
  iconSize?: number;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  buttonStyle,
  textStyle,
  width,
  customStyle,
  icon,
  iconSize
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        customStyle,
        buttonStyle,
        { width: width },
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View style={styles.buttonContentContainer}>
            {icon ? <IconSymbol
              name={icon}
              color={customStyle?.color || "#fff"}
              size={iconSize}
            /> : null}
          <Text style={textStyle}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContentContainer: { flexDirection: "row", alignItems: "center", gap: 6 },
  disabled: {
    opacity: 0.6,
  },
});

export default AppButton;
