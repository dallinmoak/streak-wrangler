import { getCurrent as getCurrentUser } from "@/models/User"
import { getByUserId as getStreaksByUserId } from "@/models/Streak";

export default async function StreakList() {
	const id = (await getCurrentUser()).id;
	const streaks = await getStreaksByUserId(id);

	return (
		<div className="space-y-1.5">
			{streaks.map((streak) => {
				return (
					<>
						<ul className="text-left">
							<li className="bg-plum-600 border-plum-900 border-solid border-2 rounded-2xl px-2 py-1 min-w-[80%]">
								<h3 className="font-serif">{streak.name}</h3>
								<p className="text-xs">{streak.description ?? ""}</p>
							</li>
						</ul>
					</>
				);
			})}
		</div>
	);
}