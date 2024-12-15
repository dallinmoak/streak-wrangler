import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const getCurrent = async (cookieHeader: string | undefined) => {
  if (!cookieHeader) {
    console.warn("No cookies provided");
    return null; // Return null if no cookies are present
  }

  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  if (!tokenMatch) {
    console.warn("No token found in cookies");
    return null; // Return null if no token is found
  }

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

    if (!user) {
      console.warn("User not found");
      return null;
    }
    return user;
  } catch (error) {
    console.error("Failed to decode or find user:", error);
    return null; // Return null on token verification failure
  }
};

export { getCurrent };
