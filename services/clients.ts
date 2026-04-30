import axiosInstance from "@/config/axios"

export const getAllClients = async () => {
    const response = await axiosInstance.get("/clients/get");
    return response;
}