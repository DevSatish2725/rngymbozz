import { MemberStatus } from "@/types/profile";

export const STATUS_CONFIG: Record<
  MemberStatus,
  { bg: string; dot: string; color: string }
> = {
  Active: { bg: "#dcfce7", dot: "#16a34a", color: "#16a34a" },
  "Expiring Soon": { bg: "#fef9c3", dot: "#f59e0b", color: "#b45309" },
  Expired: { bg: "#fee2e2", dot: "#dc2626", color: "#dc2626" },
  INACTIVE: { bg: "#e0f2fe", dot: "#0284c7", color: "#0284c7" },
  PENDING: { bg: "#fef9c3", dot: "#c79948", color: "#513017" },
};