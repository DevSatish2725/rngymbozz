import axiosInstance from "../config/axios";

export const profileApi = async () => {
  const response = await axiosInstance.get("/me");
  return response;
};
