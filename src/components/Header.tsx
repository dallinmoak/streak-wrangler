import React from "react";
import ShowUser from "./client/ShowUser";
import Link from "next/link";

export default function Header() {

  const navLink = (href: string, label: string) => {
    return (
      <Link
        href={href}
        className="text-anti-plum-50 hover:text-plum-400 focus:outline-none focus:ring-2 focus:ring-plum-400 rounded"
        aria-label={label}
      >
        {label}
      </Link>
    );
  }
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/streaks", label: "Streaks" },
    { href: "/profile", label: "Profile" },
    // { href: "/settings", label: "Settings" },
  ];
  return (
    <>
      <header className="bg-plum-900 text-anti-plum-50 p-6 flex justify-between items-center shadow-lg">
        <div>
          <Link href="/">
            <h1 className="my-1">Streak Wrangler</h1>
          </Link>
          <ShowUser property="name" />
          <h2 className="text-lg font-light">Hi, folks! Welcome to the app!</h2>
        </div>

        <nav className="flex space-x-4">
          {navLinks.map(({ href, label }) =>
            navLink(href, label)
          )}
        </nav>
      </header>
    </>
  );
}
