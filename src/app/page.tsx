import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function Home() {
  const streaks = [
    {
      title: "Exercise",
      goal: "Run 5 miles",
    },
    {
      title: "Meditation",
      goal: "30 minutes",
    },
    {
      title: "Reading",
      goal: "Read 10 pages",
    },
  ];

  return (
    <>
      <Header />
      <div className="mx-auto pt-2 w-[80%]">
        <div className="text-center">
          {/* this could be a heading ui component */}
          <h2 className="font-serif text-xl font-bold">My Streaks</h2>
          <div className="space-y-1.5">
            {streaks.map((streak) => {
              return (
                <>
                  <ul className="text-left">
                    <li className="bg-plum-600 border-plum-900 border-solid border-2 rounded-2xl px-2 py-1 min-w-[80%]">
                      <h3 className="font-serif">Exercise</h3>
                      <p className="text-xs">Run 5 miles</p>
                    </li>
                  </ul>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
