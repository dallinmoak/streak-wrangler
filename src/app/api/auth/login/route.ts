import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Find the user by username
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Generate a JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET as string, // Use an environment variable for the secret
      { expiresIn: "1h" }
    );

    // Set the token as an HTTP-only cookie
    const response = NextResponse.json({ message: "Login successful!" });
    response.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`
    );

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
