import axiosInstance from "@/config/axios";

export const getAllClients = async () => {
  const response = await axiosInstance.get("/clients/get");
  return response;
};

export const addNewClients = async (payload: any) => {
  const response = await axiosInstance.post("/clients/add", payload);
  return response;
};

export const updateClient = async (payload: any, clientId: any) => {
  const response = await axiosInstance.put(`/clients/${clientId}`, payload);
  return response;
};

export const getSingleClient = async () => {
  const response = await axiosInstance.get("/clients/get/6");
  return response;
};

export const deleteClient = async (payload: number | null) => {
  const response = await axiosInstance.delete(`/clients/${payload}`);
  return response;
};
