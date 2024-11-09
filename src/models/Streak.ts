import { prismaClient } from "@/lib/prisma";
const prisma = prismaClient();
import { Streak } from "@prisma/client";

const getByUserId = async (userId: string): Promise<Streak[]> => {
	return prisma.streak.findMany({
		where: {
			ownerId: userId,
		},
	});
};

export {
	getByUserId,
}