import { createContext } from "react";
import { User } from "@prisma/client";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export default UserContext;
