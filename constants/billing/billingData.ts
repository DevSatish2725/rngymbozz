import { Plan } from "@/types/billing";

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    icon: "★",
    iconBg: "#faeeda",
    iconColor: "#854f0b",
    prices: { monthly: 499, quarterly: 1299, yearly: 4599 },
    cycleLabel: { monthly: "month", quarterly: "quarter", yearly: "year" },
    features: ["100 Members", "Basic Attendance", "Email Support"],
  },
  {
    id: "professional",
    name: "Professional",
    icon: "♛",
    iconBg: "#eeedfe",
    iconColor: "#4f46e5",
    prices: { monthly: 1299, quarterly: 3499, yearly: 11999 },
    cycleLabel: { monthly: "month", quarterly: "quarter", yearly: "year" },
    features: ["500 Members", "Analytics", "Payments", "Priority Support"],
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: "⛨",
    iconBg: "#f3f4f6",
    iconColor: "#6b7280",
    prices: { monthly: 4599, quarterly: 11999, yearly: 39999 },
    cycleLabel: { monthly: "month", quarterly: "quarter", yearly: "year" },
    features: [
      "Unlimited Members",
      "Custom Branding",
      "Multi-Branch",
      "Account Manager",
    ],
  },
];