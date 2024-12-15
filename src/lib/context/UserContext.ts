import { createContext } from "react";
import { User } from "@prisma/client";

const UserContext = createContext<User | null>(null); // Default is `null`
export default UserContext;
