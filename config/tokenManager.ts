let token: string | null = null;
const setToken = (newToken: string | null) => {
  token = newToken;
};
const getToken = () => token;

const tokenManager = {
  setToken,
  getToken,
};

export default tokenManager;
