import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StreakList from "@/components/StreakList";

export default function Home() {


  return (
    <>
      <Header />
      <div className="mx-auto pt-2 w-[80%]">
        <div className="text-center">
          {/* this could be a heading ui component */}
          <h2 className="font-serif text-xl font-bold">My Streaks</h2>
          <StreakList />
        </div>
      </div>
      <Footer />
    </>
  );
}
