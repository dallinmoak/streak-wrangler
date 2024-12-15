import { useContext } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/lib/context/UserContext";

export default function SignOutButton() {
  const { setUser } = useContext(UserContext); // Access the `setUser` function from context
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("token"); // Clear the token
    setUser(null); // Reset user context
    router.push("/signin"); // Redirect to the sign-in page
  };

  return (
    <button onClick={handleSignOut} className="sign-out-button">
      Sign Out
    </button>
  );
}
