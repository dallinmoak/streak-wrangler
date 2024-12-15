import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma"; // Assuming Prisma is set up to interact with your database

const getCurrent = async () => {
  const cookie = cookies().get("token")?.value;

  // Log all cookies received on the server
  console.log("All Cookies:", cookies().getAll());

  // Log if the specific token cookie is missing
  if (!cookie) {
    console.log("No token cookie found");
    return null;
  }

  try {
    const decoded = jwt.verify(cookie, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    // Fetch the user from the database using the decoded userId
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    console.log("Fetched User:", user); // Log the fetched user
    return user ?? null;
  } catch (error) {
    console.error("JWT Verification or Database Error:", error);
    return null;
  }
};

export { getCurrent };
