import { createContext } from "react";
import { User } from "@prisma/client";

const UserContext = createContext<User | null>(null);
export default UserContext;
