import { SFSymbols7_0 } from "sf-symbols-typescript";

export interface PaymentRecord {
  id: string;
  clientName: string;
  amount: number;
  method: "UPI" | "Cash" | "Card" | "Net Banking";
  paymentDate: string;
  membershipEnd: string;
  status: "Paid" | "Pending" | "Failed";
}

export interface PaymentsScreenProps {
  searchQuery?: string;
  selectedMethod?: string;
  onSearchChange?: (text: string) => void;
  onMethodFilterChange: (method: string) => void;
}

export interface PaymentCardProps {
  payment: PaymentRecord;
  onPress: (payment: PaymentRecord) => void;
  onDelete: (payment: PaymentRecord) => void;
  onEdit: (payment: PaymentRecord) => void;
}

export interface FilterOptions {
  label: string;
  value: string;
}

export interface PaymentTopUIProps {
  total: number;
  onLogPayment: () => void;
}

export interface TimeOption {
  label: string;
  value: string;
  description: string;
  icon: SFSymbols7_0;
}

export interface TimeFilterSheetProps {
  value: string;
  openTimeFilterSheet: () => void;
}
