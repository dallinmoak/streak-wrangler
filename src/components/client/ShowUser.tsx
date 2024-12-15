"use client";
import { useContext } from "react";
import { User } from "@prisma/client";
import UserContext from "@/lib/context/UserContext";
type UserProp = keyof User;

export default function ShowUser({ property }: { property: UserProp }) {
  const user = useContext(UserContext);
  if (user && property in user) {
    return <span>{user[property] as string}</span>;
  } else {
    return <span>Unknown</span>;
  }
}
//new