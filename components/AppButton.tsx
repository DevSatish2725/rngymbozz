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
  icon?: ReactNode;
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
          {icon ?? null}
          <Text style={[styles.text, textStyle, { color: customStyle?.color }]}>
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
  buttonContentContainer: { flexDirection: "row", alignItems: "center" },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  disabled: {
    opacity: 0.6,
  },
});

export default AppButton;
