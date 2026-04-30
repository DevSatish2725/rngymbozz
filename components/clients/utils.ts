import { AllClientsData } from "@/types/clients";

export const SEARCH_BY_NAME_AND_PHONE = (
  data: AllClientsData[],
  searchTerm: string,
) => {
  return data.filter(
    (client) =>
      client.name.includes(searchTerm) || client.phone.includes(searchTerm),
  );
};

export const FILTER = (data: AllClientsData[], filterTerm: string) => {
  const modifiedFilterTerm =
    filterTerm === "In Active"
      ? "INACTIVE"
      : filterTerm === "All"
        ? "All"
        : filterTerm;
  return modifiedFilterTerm === "All"
    ? data
    : data.filter(
        (client) =>
          client.status.toLowerCase() === modifiedFilterTerm.toLowerCase(),
      );
};
