// File: src/app/signin/page.tsx

"use client";

import React, { useState } from "react";

export default function SignInPage() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update the corresponding input field in the loginData state.
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send login request to the API with user-provided credentials.
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const rawResponse = await res.text();
    console.log("Raw response:", rawResponse);

    try {
      // Attempt to parse the server's response as JSON.
      const result = JSON.parse(rawResponse);
      if (res.ok) {
        setMessage("Login successful!");
        // Save the JWT token in localStorage for future API requests.
        localStorage.setItem("token", result.token);
      } else {
        setMessage(`Login failed: ${result.error}`);
      }
    } catch (err) {
      // Handle cases where the server's response is not valid JSON.
      console.error("Error parsing JSON:", err);
      setMessage("Failed to parse server response.");
    }
  };

  return (
    <div className="bg-plum-100 min-h-screen flex flex-col items-center justify-start text-plum-900 p-6">
      <h1 className="text-3xl font-bold font-serif mb-6">Sign In</h1>

      {/* Display a message to provide feedback to the user */}
      {message && (
        <div className="mb-4 p-4 bg-plum-200 text-plum-900 rounded shadow-md">
          {message}
        </div>
      )}

      {/* Form for user login */}
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

      {/* Link to the signup page for users without an account */}
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
