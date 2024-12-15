import { cookies } from "next/headers"; // Import cookies utility
import { getCurrent as getCurrentUser } from "@/models/User";
import { getByUserId as getStreaksByUserId } from "@/models/Streak";
import HomeActionItem from "../ui/HomeActionItem";
import Link from "next/link";

export default async function StreakList() {
  const cookieHeader = cookies().get("token")?.value; // Retrieve the token cookie
  const user = await getCurrentUser(cookieHeader);

  // Handle unauthenticated users
  if (!user) {
    return (
      <div className="text-center">
        <p className="text-gray-500">Please sign in to view your streaks.</p>
        <Link
          href="/signin"
          className="text-plum-500 underline hover:text-plum-700"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const streaks = await getStreaksByUserId(user.id);

  return (
    <div className="space-y-1.5">
      {streaks.map((streak) => (
        <ul className="text-left" key={streak.id}>
          <li>
            <Link href={`/streak/${streak.id}`}>
              <HomeActionItem>
                <h3 className="font-serif">{streak.name}</h3>
                <p className="text-xs">{streak.description ?? ""}</p>
              </HomeActionItem>
            </Link>
          </li>
        </ul>
      ))}
    </div>
  );
}
