// File: models/User.ts
import prisma from "@/lib/prisma"; // Use the default export

const getCurrent = async () => {
  return (await prisma.user.findMany())[0];
};

export {
  getCurrent,
};
