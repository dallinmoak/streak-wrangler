import { create } from "@/models/Streak";

export async function POST(request: Request) {
  try {
    const streak = await request.json();

    // Create a new streak record using the provided data.
    const newStreak = await create(streak);

    return new Response(JSON.stringify(newStreak), {
      headers: { "content-type": "application/json" },
    });
  } catch (e: any) {
    // Log the error to help with debugging and respond with a server error status.
    console.log(e);
    return new Response(e.message, { status: 500 });
  }
}
