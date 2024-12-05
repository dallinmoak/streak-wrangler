// File: src/app/landing/page.tsx

import React from "react";

export default function LandingPage() {
  return (
    <div className="bg-plum-100 min-h-screen flex flex-col items-center justify-start text-plum-900 p-6">
      {/* Main Content */}
      <h1>Welcome to Streak Wrangler</h1>
      <p className="text-lg font-light mb-8">You're not currently signed in.</p>

      {/* Buttons to Navigate */}
      <div className="space-x-4">
        <a
          href="/profile/signin"
          className="px-6 py-3 bg-plum-500 text-anti-plum-50 rounded shadow-md hover:bg-plum-600 focus:outline-none focus:ring-4 focus:ring-plum-400"
        >
          Sign In
        </a>
        <a
          href="/profile/signup"
          className="px-6 py-3 bg-green-500 text-anti-plum-50 rounded shadow-md hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400"
        >
          Sign Up
        </a>
      </div>

      {/* Footer-like Text */}
      <footer className="mt-12 text-sm text-plum-700">
        <p>&copy; {new Date().getFullYear()} Streak Wrangler. All rights reserved.</p>
      </footer>
    </div>
  );
}
