import theme from "@/app/theme/theme";
import { allClientsStateFn } from "@/redux/features/clients/clientsSlice";
import { AllClientsData } from "@/types/clients";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const StatCard = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) => (
  <View style={styles.statCard}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>
      {value} {unit && <Text style={styles.statUnit}>{unit}</Text>}
    </Text>
  </View>
);

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    {value ? (
      <Text style={styles.infoValue}>{value}</Text>
    ) : (
      <Text style={styles.nullValue}>Not set</Text>
    )}
  </View>
);

const SectionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.card}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const ViewClient = () => {
  const allClientsData = useSelector(allClientsStateFn);
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const matchedClientData = allClientsData.find(
    (client: AllClientsData) => Number(client.id) === Number(id),
  );

  //   useEffect(() => {
  //     getSingleClient();
  //   }, []);

  if (matchedClientData !== -1) {
    const {
      name,
      phone,
      email,
      address,
      height,
      weight,
      description,
      joinedDate,
      status,
      membershipStartDate,
      membershipEndDate,
      plan,
    } = matchedClientData;
    const bmi =
      height && weight
        ? (Number(weight) / Math.pow(Number(height) / 100, 2)).toFixed(1)
        : null;

    const initials = name.charAt(0).toUpperCase();
    return (
      <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { paddingBottom: insets.bottom + 24 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile card */}
          <View style={styles.card}>
            <View style={styles.profileRow}>
              <View style={styles.avatarRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{initials}</Text>
                </View>
                <View>
                  <Text style={styles.clientName}>{name}</Text>
                  <Text style={styles.joinedDate}>
                    Member since {joinedDate}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor:
                      status === "ACTIVE" ? "#e8f5e9" : "#fdecea",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: status === "ACTIVE" ? "#2e7d32" : "#c62828" },
                  ]}
                >
                  {status}
                </Text>
              </View>
            </View>

            {/* Stats row */}
            <View style={styles.statsRow}>
              <StatCard label="Height" value={height} unit="cm" />
              <StatCard label="Weight" value={weight} unit="kg" />
              {bmi && <StatCard label="BMI" value={bmi} />}
            </View>
          </View>

          {/* Contact info */}
          <SectionCard title="Contact info">
            <InfoRow label="Phone" value={phone} />
            <InfoRow label="Email" value={email} />
            <InfoRow label="Address" value={address} />
          </SectionCard>

          {/* Membership */}
          <SectionCard title="Membership">
            <InfoRow label="Plan" value={plan} />
            <InfoRow label="Start date" value={membershipStartDate} />
            <InfoRow label="End date" value={membershipEndDate} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor:
                      status === "ACTIVE" ? "#e8f5e9" : "#fdecea",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: status === "ACTIVE" ? "#2e7d32" : "#c62828" },
                  ]}
                >
                  {status}
                </Text>
              </View>
            </View>
          </SectionCard>

          {/* Notes */}
          {description && (
            <SectionCard title="Fitness Goals / Description">
              <Text style={styles.notes}>{description}</Text>
            </SectionCard>
          )}

          {/* Edit button */}
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() =>
              router.push({ pathname: "/clients/[id]/edit", params: { id } })
            }
          >
            <Text style={styles.editBtnText}>Edit Client</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View>
        <Text>No client found.</Text>
      </View>
    );
  }
};

export default ViewClient;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#ededfd",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.primary,
  },
  clientName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
  },
  joinedDate: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 12,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  statUnit: {
    fontSize: 12,
    fontWeight: "400",
    color: "#6b7280",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f3f4f6",
  },
  infoLabel: {
    fontSize: 13,
    color: "#6b7280",
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "500",
    color: "#111827",
    textAlign: "right",
    maxWidth: "60%",
  },
  nullValue: {
    fontSize: 13,
    color: "#d1d5db",
    fontStyle: "italic",
  },
  notes: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  editBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 4,
  },
  editBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
