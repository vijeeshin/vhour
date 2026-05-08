import {jwtDecode} from "jwt-decode";

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);

    // exp is in seconds → convert to ms
    console.log(exp * 1000, Date.now());
    return exp * 1000 > Date.now();
  } catch (e) {
    console.error("Failed to decode token:", e);
    return false;
  }
};