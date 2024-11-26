import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export function authenticate(
  req: NextApiRequest,
  res: NextApiResponse,
  next: (user: { userId: string }) => void
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    next(decoded); // Pass the decoded user to the handler
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
