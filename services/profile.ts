import axiosInstance from "../config/axios";

export const profileApi = async () => {
  const response = await axiosInstance.get("/me");
  console.log("profile data", response);
  return response;
};
