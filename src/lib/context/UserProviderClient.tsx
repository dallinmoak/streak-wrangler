"use client";

import React from "react";
import UserProvider from "@/components/providers/User";
import { User } from "@prisma/client";

export default function UserProviderClient({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  return <UserProvider user={user}>{children}</UserProvider>;
}
