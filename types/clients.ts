export type FilterStatus =
  | "All"
  | "Expiring Soon"
  | "Active"
  | "In Active"
  | "Expired";
export type AllClientsData = {
  address: string;
  description: string;
  email: string;
  height: string;
  id: number;
  joinedDate: string;
  membershipEndDate: null | string;
  membershipStartDate: null | string;
  name: string;
  phone: string;
  plan: null | string;
  status: string;
  weight: string;
};

export type ClientListProps = {
  clients: AllClientsData[];
  onPress: (client: AllClientsData) => void;
  onEdit: (client: AllClientsData) => void;
  onDelete: (client: AllClientsData) => void;
};

export type ClientCardProps = {
  client: AllClientsData;
  onPress: (client: AllClientsData) => void;
  onEdit: (client: AllClientsData) => void;
  onDelete: (client: AllClientsData) => void;
};

export type RightActionProps = {
  client: AllClientsData;
  onEdit: (client: AllClientsData) => void;
  onDelete: (client: AllClientsData) => void;
};

export type InitialState = {
  loading: boolean;
  allClients: AllClientsData[];
  error: string;
}
