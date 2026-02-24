import parseApiError from "@/utils/errorHandler";

const apiClient = async (promise: Promise<any>) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error: any) {
    console.log("API error:", error);
    return {
      error: parseApiError(error),
    }
  }
};

export default apiClient;
