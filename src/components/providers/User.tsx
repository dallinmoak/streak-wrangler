"use client";

import UserContext from "../../lib/context/UserContext";
import { User } from "@prisma/client";

export default function UserProvider({
  children,
  user,
}: {
  children: any;
  user: User;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
