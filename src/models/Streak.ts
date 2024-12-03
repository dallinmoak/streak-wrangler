import prisma from "@/lib/prisma"; // Use the default export from lib/prisma
import { Streak } from "@prisma/client";

const getByUserId = async (userId: string): Promise<Streak[]> => {
  return prisma.streak.findMany({
    where: {
      ownerId: userId,
    },
  });
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
	create,
};