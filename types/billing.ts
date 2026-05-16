export type BillingCycle = "monthly" | "quarterly" | "yearly";

export interface Plan {
  id: string;
  name: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  prices: Record<BillingCycle, number>;
  cycleLabel: Record<BillingCycle, string>;
  features: string[];
  featured?: boolean;
}

export interface BillingProps {
  onSelectPlan?: (plan: Plan, cycle: BillingCycle) => void;
}

export interface BillingCardProps {
  plan: Plan;
  cycle: BillingCycle;
  onSelectPlan?: (plan: Plan, cycle: BillingCycle) => void;
}   