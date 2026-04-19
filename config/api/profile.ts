import axiosInstance from "../axios";

export const profileApi = async () => {
  const response = await axiosInstance.get("/me");
  console.log("profile data", response);
  return response;
};
