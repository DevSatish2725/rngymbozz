import { FilterOptions, PaymentRecord, TimeOption } from "@/types/payment";
import { SFSymbols7_0 } from "sf-symbols-typescript";

export const STATUS_CONFIG: Record<
  PaymentRecord["status"],
  { bg: string; color: string; dot: string }
> = {
  Paid: { bg: "#dcfce7", color: "#16a34a", dot: "#16a34a" },
  Pending: { bg: "#fef9c3", color: "#b45309", dot: "#f59e0b" },
  Failed: { bg: "#fee2e2", color: "#dc2626", dot: "#dc2626" },
};

export const METHOD_CONFIG: Record<
  PaymentRecord["method"],
  { icon: SFSymbols7_0; bg: string; color: string }
> = {
  UPI: { icon: "bolt.fill", bg: "#eeedfe", color: "#4f46e5" },
  Cash: { icon: "banknote", bg: "#dcfce7", color: "#16a34a" },
  Card: { icon: "creditcard.fill", bg: "#e0f2fe", color: "#0284c7" },
  "Net Banking": {
    icon: "building.columns.fill",
    bg: "#faeeda",
    color: "#854f0b",
  },
};

export const TIME_OPTIONS: FilterOptions[] = [
  { label: "All Time",      value: "all" },
  { label: "This Month",    value: "this_month" },
  { label: "Past 3 Months", value: "past_3_months" },
  { label: "Past 6 Months", value: "past_6_months" },
  { label: "This Year",     value: "this_year" },
];
 
export const METHOD_OPTIONS: FilterOptions[] = [
  { label: "All Methods", value: "all" },
  { label: "CASH",        value: "cash" },
  { label: "UPI",         value: "upi" },
  { label: "CARD",        value: "card" },
  { label: "Net Banking", value: "net_banking" },
];

export const TIME_OPTIONS_DETAILS: TimeOption[] = [
  {
    label: "All Time",
    value: "all",
    description: "Show every payment ever recorded",
    icon: "infinity",
  },
  {
    label: "This Month",
    value: "this_month",
    description: "Payments from the current calendar month",
    icon: "calendar.circle.fill",
  },
  {
    label: "Past 3 Months",
    value: "past_3_months",
    description: "Last 90 days of payment activity",
    icon: "calendar.badge.clock",
  },
  {
    label: "Past 6 Months",
    value: "past_6_months",
    description: "Last 180 days of payment activity",
    icon: "clock.arrow.circlepath",
  },
  {
    label: "This Year",
    value: "this_year",
    description: "All payments in the current year",
    icon: "chart.line.uptrend.xyaxis",
  },
];