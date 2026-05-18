import theme from "@/app/theme/theme";
import { PaymentStatus } from "@/types/dashboart";
import { SFSymbols7_0 } from "sf-symbols-typescript";


export const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatus,
  { bg: string; color: string; icon: SFSymbols7_0 }
> = {
  Paid:    { bg: "#dcfce7", color: "#16a34a", icon: "checkmark.circle.fill" },
  Pending: { bg: "#fef9c3", color: "#b45309", icon: "clock.fill" },
  Failed:  { bg: "#fee2e2", color: "#dc2626", icon: "xmark.circle.fill" },
};

export const BAR_COLOR = (pct: number) => {
  if (pct >= 80) return theme.colors.primary;
  if (pct >= 50) return "#818cf8";
  if (pct >= 30) return "#c7d2fe";
  return "#e0e7ff";
};