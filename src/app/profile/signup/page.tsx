// File: src/app/signup/page.tsx

"use client";

import React, { useState } from "react";

export default function SignUpPage() {
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData),
    });

    const rawResponse = await res.text();
    console.log("Raw response:", rawResponse);

    try {
      const result = JSON.parse(rawResponse);
      if (res.ok) {
        setMessage("Signup successful!");
      } else {
        setMessage(`Signup failed: ${result.error}`);
      }
    } catch (err) {
      console.error("Error parsing JSON:", err);
      setMessage("Failed to parse server response.");
    }
  };

  return (
    <div className="bg-plum-100 min-h-screen flex flex-col items-center justify-center text-plum-900 p-6">
      <h1 className="text-3xl font-bold font-serif mb-6">Create an Account</h1>

      {/* Message Section */}
      {message && (
        <div className="mb-4 p-4 bg-plum-200 text-plum-900 rounded shadow-md">
          {message}
        </div>
      )}

      {/* Sign Up Form */}
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={signupData.name}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded text-plum-900 focus:outline-none focus:ring-2 focus:ring-plum-400"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={signupData.username}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded text-plum-900 focus:outline-none focus:ring-2 focus:ring-plum-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signupData.password}
          onChange={handleInputChange}
          required
          className="w-full p-3 border border-gray-300 rounded text-plum-900 focus:outline-none focus:ring-2 focus:ring-plum-400"
        />
        <button
          type="submit"
          className="w-full px-4 py-3 bg-green-500 text-white rounded shadow-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400"
        >
          Sign Up
        </button>
      </form>

      {/* Link to Sign In Page */}
      <p className="mt-6 text-sm">
        Already have an account?{" "}
        <a
          href="/signin"
          className="text-plum-600 hover:underline focus:outline-none focus:ring-2 focus:ring-plum-400"
        >
          Sign In
        </a>
      </p>
    </div>
  );
}
