import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function PeakHourChart() {
  // Hour-wise data (0–23)
  const hourlyData = [
    // { hour: 0, value: 10 },
    // { hour: 1, value: 5 },
    // { hour: 2, value: 2 },
    // { hour: 3, value: 1 },
    // { hour: 4, value: 3 },
    { hour: 5, value: 6 },
    { hour: 6, value: 15 },
    { hour: 7, value: 25 },
    { hour: 8, value: 40 },
    { hour: 9, value: 55 },
    { hour: 10, value: 60 },
    { hour: 11, value: 75 },
    { hour: 12, value: 90 },
    { hour: 13, value: 85 },
    { hour: 14, value: 70 },
    { hour: 15, value: 65 },
    { hour: 16, value: 80 },
    { hour: 17, value: 95 }, // 🔥 Peak
    { hour: 18, value: 88 },
    { hour: 19, value: 72 },
    { hour: 20, value: 50 },
    { hour: 21, value: 40 },
    { hour: 22, value: 30 },
    { hour: 23, value: 20 },
  ];

  const maxValue = Math.max(...hourlyData.map((d) => d.value));
  const peakHours = hourlyData.filter((d) => d.value === maxValue);
  // Format hour
  const formatHour = (h: number) => `${h % 12 || 12} ${h < 12 ? "AM" : "PM"}`;
  // Chart data
  const chartData = {
    labels: hourlyData.map((d) => d.hour.toString()),
    datasets: [
      {
        data: hourlyData.map((d) => d.value),
      },
    ],
  };

  // Chart config
  const chartConfig = {
    backgroundGradientFrom: "#F8F9FF",
    backgroundGradientTo: "#F8F9FF",

    decimalPlaces: 0,

    // Line color (primary)
    color: (opacity = 1) => `rgba(91, 95, 239, ${opacity})`,

    // Label color
    labelColor: (opacity = 1) => `rgba(80, 80, 120, ${opacity})`,

    // Dot styling
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#5B5FEF",
      fill: "#ffffff",
    },

    // Grid lines
    propsForBackgroundLines: {
      stroke: "#E6E8FF",
      strokeDasharray: "", // solid line
    },
  };

  return (
    <View>
      {/* Peak Hour Display */}
      <View style={styles.peakContainer}>
        <Text style={styles.peakTitle}>Peak Hour(s)</Text>
        {peakHours.map((p) => (
          <Text key={p.hour} style={styles.peakText}>
            {formatHour(p.hour)} - {formatHour(p.hour + 1)} ({p.value})
          </Text>
        ))}
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={screenWidth - 55}
          height={250}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  chartContainer: {
    marginVertical: 16,
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,

    // shadow (iOS)
    shadowColor: "#5B5FEF",
    shadowOpacity: 0.1,
    shadowRadius: 10,

    // elevation (Android)
    elevation: 4,
  },
  chart: {
    borderRadius: 12,
    backgroundColor: "rgba(91,95,239,1)",
  },
  peakContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  peakTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  peakText: {
    fontSize: 14,
    marginVertical: 2,
  },
});
