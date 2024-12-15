import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  userId: string;
  username: string;
}

export const getDecodedToken = (): TokenPayload | null => {
  if (typeof window === "undefined") return null; // Ensure code runs on the client

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode<TokenPayload>(token);
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};
