import { getAccessToken } from "../../shared/utils/token";

const authHeader = () => {
  const token = getAccessToken();
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
};

export const getHeaders = () => ({
  "Content-Type": "application/json",
  ...authHeader(),
});
