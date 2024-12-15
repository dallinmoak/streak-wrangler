import { NextResponse } from "next/server";

export async function POST() {
  // Clear the token cookie by setting it with Max-Age=0
  return NextResponse.json(
    { message: "Logout successful!" },
    {
      headers: {
        "Set-Cookie": "token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0",
      },
    }
  );
}
