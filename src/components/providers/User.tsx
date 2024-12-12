"use client";

import React, { useState } from "react";
import UserContext from "@/lib/context/UserContext";
import { User } from "@prisma/client";

interface UserProviderProps {
  children: React.ReactNode;
  user: User | null; // Add user prop to the interface
}

export default function UserProvider({ children, user }: UserProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(user);

  return (
    <UserContext.Provider value={{ user: currentUser, setUser: setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}
