import { prismaClient } from "@/lib/prisma"
const prisma = prismaClient()

const getCurrent = async () => {
	return (await prisma.user.findMany())[0];
}

export {
	getCurrent,
}