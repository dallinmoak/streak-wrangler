"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/lib/context/UserContext";

export default function SignInPage() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext);
  const router = useRouter();

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
          setUser(userData);
          router.push("/");
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

      {/* Message Section */}
      {message && (
        <div className="mb-4 p-4 bg-plum-200 text-plum-900 rounded shadow-md">
          {message}
        </div>
      )}

      {/* Sign In Form */}
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={loginData.username}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded text-plum-900 focus:outline-none focus:ring-2 focus:ring-plum-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded text-plum-900 focus:outline-none focus:ring-2 focus:ring-plum-400"
        />
        <button
          type="submit"
          className="w-full px-4 py-3 bg-plum-500 text-white rounded shadow-md hover:bg-plum-600 focus:outline-none focus:ring-4 focus:ring-plum-400"
        >
          Sign In
        </button>
      </form>

      {/* Link to Sign Up Page */}
      <p className="mt-6 text-sm">
        Don’t have an account?{" "}
        <a
          href="/signup"
          className="text-plum-600 hover:underline focus:outline-none focus:ring-2 focus:ring-plum-400"
        >
          Sign Up
        </a>
      </p>
    </div>
  );
}
