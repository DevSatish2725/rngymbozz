const parseApiError = (error: any): string => {
  if (!error.response) {
    return "Unable to connect. Please check your internet connection.";
  }

  const { status, data } = error.response;

  if (status === 400) return data?.message || "Invalid request.";
  if (status === 401) return "Session expired. Please log in again.";
  if (status === 403) return data?.message || "You are not allowed to perform this action.";
  if (status === 404) return "Requested resource not found.";
  if (status >= 500) return "Something went wrong. Please try again later.";

  return "Unexpected error occurred.";
};

export default parseApiError;