"use client";

import React, { useContext } from "react";
import ShowUser from "./client/ShowUser";
import UserContext from "@/lib/context/UserContext";

export default function Header() {
  const { user, setUser } = useContext(UserContext); // Access the user and setUser from context

  const handleSignOut = () => {
    localStorage.removeItem("token"); // Clear the token
    setUser(null); // Reset user context
    window.location.href = "/profile/signin"; // Redirect to sign-in page
  };

  return (
    <>
      <header className="bg-plum-900 text-anti-plum-50 p-6 flex justify-between items-center shadow-lg">
        {/* Branding */}
        <div>
          <h1 className="font-serif font-bold text-3xl">Streak Wrangler</h1>
          <h2 className="text-lg font-light">
            {user ? `Welcome, ${user.name}!` : "Welcome, Guest!"}
          </h2>
        </div>

        {/* Navigation or utility section */}
        <nav className="flex space-x-4">
          {/* Home Button */}
          <a
            href="/"
            className="text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded"
            aria-label="Home"
          >
            Home
          </a>
          {/* Streaks Button */}
          <a
            href="#streaks"
            className="text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded"
            aria-label="Streaks"
          >
            Streaks
          </a>
          {/* Profile Button */}
          <a
            href="/profile"
            className="text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded"
            aria-label="Profile"
          >
            Profile
          </a>
          {/* Settings Button */}
          <a
            href="#settings"
            className="text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded"
            aria-label="Settings"
          >
            Settings
          </a>

          {/* Sign Out Button */}
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
    </>
  );
}
