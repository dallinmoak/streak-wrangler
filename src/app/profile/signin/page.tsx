"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/lib/context/UserContext";

export default function SignInPage() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext); // Access `setUser` from context to update user data
  const router = useRouter(); // To redirect after login

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send login request to the API
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Login successful!");
        localStorage.setItem("token", result.token); // Store JWT token

        // Fetch user data with the token
        const userRes = await fetch("/api/user/me", {
          headers: {
            Authorization: `Bearer ${result.token}`,
          },
        });
        const userData = await userRes.json();

        if (userRes.ok) {
          setUser(userData); // Update user context with fetched data
          router.push("/"); // Redirect to the home page or dashboard
        } else {
          setMessage("Failed to fetch user data.");
        }
      } else {
        setMessage(`Login failed: ${result.error}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-plum-100 min-h-screen flex flex-col items-center justify-start text-plum-900 p-6">
      <h1 className="text-3xl font-bold font-serif mb-6">Sign In</h1>
      {message && <div>{message}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          value={loginData.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
