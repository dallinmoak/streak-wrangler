import { getCurrent as getCurrentUser } from "@/models/User"
import { getByUserId as getStreaksByUserId } from "@/models/Streak";
import HomeActionItem from "../ui/HomeActionItem";

export default async function StreakList() {
	const id = (await getCurrentUser()).id;
	const streaks = await getStreaksByUserId(id);

	return (
		<div className="space-y-1.5">
			{streaks.map((streak) => {
				return (
					<>
						<ul className="text-left">
							<li>
								<HomeActionItem>
									<h3 className="font-serif">{streak.name}</h3>
									<p className="text-xs">{streak.description ?? ""}</p>
								</HomeActionItem>
							</li>
						</ul>
					</>
				);
			})}
		</div>
	);
}