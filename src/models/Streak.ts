import prisma from "@/lib/prisma"; // Prisma client for database operations
import { Streak } from "@prisma/client";

const getByUserId = async (userId: string): Promise<Streak[]> => {
  // Fetch all streaks owned by a specific user.
  return prisma.streak.findMany({
    where: {
      ownerId: userId,
    },
  });
};

const create = async (streak: Streak): Promise<Streak> => {
  // Create a new streak while ensuring the `id` is excluded (auto-generated) and serializing config data.
  return prisma.streak.create({
    data: {
      ...streak,
      id: undefined, // Exclude `id` to prevent conflicts with auto-generated ID.
      config: {
        ...streak.config,
        repeatInterval: JSON.stringify(streak.config.repeatInterval), // Serialize repeatInterval to store complex structures.
      },
    },
  });
};

export {
  getByUserId,
  create,
};
