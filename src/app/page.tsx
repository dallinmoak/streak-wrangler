
import StreakList from "@/components/streak/StreakList";
import Link from 'next/link'
import HomeActionItem from "@/components/ui/HomeActionItem";

export default function Home() {


  return (
    <>
      <div className="mx-auto pt-2 w-[80%]">
        <div className="text-center">
          <h2>My Streaks</h2>
          <StreakList />
          <Link href="/new-streak">
            <HomeActionItem>
              Add a streak
            </HomeActionItem>
          </Link>
        </div>
      </div>
    </>
  );
}
