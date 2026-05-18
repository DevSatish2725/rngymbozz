import { SFSymbols7_0 } from "sf-symbols-typescript";

export interface StatCard {
  id: string;
  label: string;
  value: string;
  icon: SFSymbols7_0;
  iconBg: string;
  iconColor: string;
  trend?: string;
  trendType?: "up" | "down" | "neutral";
}
export interface PeakHour {
  label: string;
  percentage: number; // 0–100
}

export type PaymentStatus = "Paid" | "Pending" | "Failed";

export interface RecentPayment {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  method: string;
  date: string;
  amount: number;
  status: PaymentStatus;
}