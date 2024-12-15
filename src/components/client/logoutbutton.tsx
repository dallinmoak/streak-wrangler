"use client";

import React from "react";
import { logout } from "@/utils/auth";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logout();
    console.log("Logged out successfully!");
    // Redirect to the home or sign-in page after logout
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className="text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded"
    >
      Logout
    </button>
  );
}
