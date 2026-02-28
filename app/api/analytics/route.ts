import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { user_id } = await request.json();

    if (!user_id) {
      return NextResponse.json(
        { error: "Missing user_id" },
        { status: 400 }
      );
    }

    const supabase = await createServiceClient();
    const referrer = request.headers.get("referer") || null;

    await supabase.from("page_views").insert({
      user_id,
      referrer,
      country: null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to record page view" },
      { status: 500 }
    );
  }
}
