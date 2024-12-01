import { create } from "@/models/Streak";

export async function POST(request: Request) {
  try {
    const streak = await request.json();
    const newStreak = await create(streak);
    console.log('new streak', newStreak);
    return new Response(JSON.stringify(newStreak), {
      headers: { "content-type": "application/json" },
    });
  } catch (e: any) {
    console.log(e);
    return new Response(e.message, { status: 500 });
  }
}