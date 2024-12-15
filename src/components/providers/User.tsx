"use client";

import UserContext from "../../lib/context/UserContext";
import { User } from "@prisma/client";

export default function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null; // Allow `user` to be null
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
