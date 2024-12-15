"use client";

import React from "react";
import { getDecodedToken } from "../scripts/decodeToken"; // Adjust the path to your utility

export default function Header() {
  const user = getDecodedToken(); // Decode the token to get user information

  const handleSignOut = () => {
    localStorage.removeItem("token"); // Clear the token
    window.location.href = "/profile/signin"; // Redirect to sign-in page
  };

  return (
    <header className="bg-plum-900 text-anti-plum-50 p-6 flex justify-between items-center shadow-lg">
      <div>
        <h1 className="font-serif font-bold text-3xl">Streak Wrangler</h1>
        <h2 className="text-lg font-light">
          {user ? `Welcome, ${user.username}!` : "Welcome, Guest!"}
        </h2>
      </div>

      <nav className="flex space-x-4">
        <a
          href="/"
          className="text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded"
          aria-label="Home"
        >
          Home
        </a>
        <a
          href="#streaks"
          className="text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded"
          aria-label="Streaks"
        >
          Streaks
        </a>
        <a
          href="/profile"
          className="text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded"
          aria-label="Profile"
        >
          Profile
        </a>
        <a
          href="#settings"
          className="text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded"
          aria-label="Settings"
        >
          Settings
        </a>
        {user && (
          <button
            onClick={handleSignOut}
            className="text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded"
          >
            Sign Out
          </button>
        )}
      </nav>
    </header>
  );
}
