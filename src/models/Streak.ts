import prisma from "@/lib/prisma"; // Use the default export from lib/prisma
import { Streak } from "@prisma/client";

const getByUserId = async (userId: string): Promise<Streak[]> => {
	return prisma.streak.findMany({
		where: {
			ownerId: userId,
		},
	});
};

const getById = async (id: string): Promise<Streak> => {
	const found = await prisma.streak.findUnique({
		where: {
			id,
		},
	});
	if (!found) {
		throw new Error("Streak not found");
	}
	return found;
};

const create = async (streak: Streak): Promise<Streak> => {
	return prisma.streak.create({
		data: {
			...streak,
			id: undefined,
			config: {
				...streak.config,
				repeatInterval: JSON.stringify(streak.config.repeatInterval),
			}
		},
	});
};

export {
	getByUserId,
	getById,
	create,
};