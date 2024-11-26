import prisma from "@/lib/prisma"; // Use the default export from lib/prisma
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
};
