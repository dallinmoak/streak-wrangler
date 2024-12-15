import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const getCurrent = async (cookieHeader: string | undefined) => {
  if (!cookieHeader) throw new Error("No cookies provided");

  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  if (!tokenMatch) throw new Error("No token found");

  const token = tokenMatch[1];

  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    // Fetch the user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    console.error("Failed to decode or find user:", error);
    throw new Error("Invalid or expired token");
  }
};

export { getCurrent };
