// File: src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { username, password, name } = await req.json();

    // Ensure usernames are unique to prevent conflicts during login.
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    // Hash the password for secure storage in the database.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the new user record in the database.
    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword, name },
    });

    return NextResponse.json({ success: true, userId: newUser.id }, { status: 201 });
  } catch (error) {
    // Log unexpected errors to aid debugging.
    console.error("Error in signup:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
