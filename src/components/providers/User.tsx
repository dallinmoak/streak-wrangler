"use client";

import React, { useState } from "react";
import UserContext from "@/lib/context/UserContext";
import { User } from "@prisma/client";

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
