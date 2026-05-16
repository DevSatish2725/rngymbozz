import { BillingCycle } from "@/types/billing";

export const CYCLES: { key: BillingCycle; label: string }[] = [
  { key: "monthly", label: "Monthly" },
  { key: "quarterly", label: "Quarterly" },
  { key: "yearly", label: "Yearly" },
];