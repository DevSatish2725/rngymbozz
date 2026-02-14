import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  type?: string;
}

export default function AppInput({
  label,
  error,
  type,
  ...props
}: AppInputProps) {
  const [secureText, setSecureText] = useState(true);
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {type === "password" ? (
          <>
            <TextInput
              style={[styles.input, error && { borderColor: "red" }]}
              secureTextEntry={secureText}
              {...props}
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <Text style={styles.toggle}>{secureText ? "Show" : "Hide"}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TextInput
            style={[styles.input, error && { borderColor: "red" }]}
            {...props}
          />
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  label: {
    marginBlock: 6,
    fontWeight: "600",
  },
  input: {
    flex: 1,
    height: 45,
  },
  toggle: {
    color: "#4a90e2",
    fontWeight: "500",
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: "red",
  },
});
