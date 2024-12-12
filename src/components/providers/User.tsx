"use client"; // Specifies the code is for the client side.

import UserContext from "../../lib/context/UserContext";
import { User } from "@prisma/client";

// Context provider for sharing the current user object across the app.
export default function UserProvider({
  children,
  user,
}: {
  children: any; // Components wrapped by the provider.
  user: User;    // Current user data.
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
