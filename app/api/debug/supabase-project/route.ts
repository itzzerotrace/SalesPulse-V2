import { NextResponse } from "next/server";

export async function GET() {
  const raw =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "";

  if (!raw) {
    return NextResponse.json({
      error: "No Supabase URL available in production."
    });
  }

  try {
    const url = new URL(raw);

    return NextResponse.json({
      host: url.hostname,
      projectRef: url.hostname.split(".")[0]
    });
  } catch {
    return NextResponse.json({
      error: "Supabase URL exists but could not be parsed."
    });
  }
}
