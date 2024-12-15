import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const getCurrent = async (token: string | null) => {
  if (!token) {
    return null; // No token provided, no user to fetch
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    // Fetch the user based on the decoded userId
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    return user || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; // Invalid token
  }
};

export { getCurrent };
