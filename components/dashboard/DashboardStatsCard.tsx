import { ReactNode } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

interface props {
  title: string;
  count: string | number;
  icon: ReactNode;
  iconBg: string;
}

const { width, height } = Dimensions.get("window");
const DashboardStatsCard = ({ title, count, icon, iconBg }: props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>{title}</Text>
        <Text style={{ fontSize: 26, fontWeight: 600 }}>{count}</Text>
      </View>
      <View style={[styles.iconContainer, {backgroundColor: iconBg}]}>
      {icon}
      </View>
    </View>
  );
};

export default DashboardStatsCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 8,
    borderWidth: 1,
    borderRadius: 12,
    width: width * 0.94,
    height: 100,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 12,
  }
});
