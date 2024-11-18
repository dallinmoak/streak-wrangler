// File: pages/api/auth/signup.ts
// Handles user registration with hashed passwords.

import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password, name }: { username: string; password: string; name: string } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword, name },
    });

    return res.status(201).json({ success: true, userId: newUser.id });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
