import { jwtDecode } from "jwt-decode";


interface TokenPayload {
  userId: string;
  username: string;
  name: string;
}

export const getDecodedToken = (): TokenPayload | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode<TokenPayload>(token);
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};
