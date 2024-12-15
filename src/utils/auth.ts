export const logout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      console.log("User logged out successfully");
    } else {
      console.error("Failed to log out");
    }
  };
  