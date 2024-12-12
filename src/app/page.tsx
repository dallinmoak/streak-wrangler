import UserProvider from "@/components/providers/User";
import StreakList from "@/components/streak/StreakList";
import Link from 'next/link'
import HomeActionItem from "@/components/ui/HomeActionItem";

export default function Home() {
  return (
    <UserProvider>
      <div className="mx-auto pt-2 w-[80%]">
        <div className="text-center">
          <h2 className="font-serif text-xl font-bold">My Streaks</h2>
          <StreakList />
          <Link href="/new-streak">
            <HomeActionItem>
              Add a streak
            </HomeActionItem>
          </Link>
        </div>
      </div>
    </UserProvider>
  );
}
