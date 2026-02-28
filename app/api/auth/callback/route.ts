import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirect = searchParams.get("redirect");

  if (code) {
    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      // Redirect to login with error if code exchange fails
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent("Authentication failed. Please try again.")}`
      );
    }

    // Check if the user has a profile
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      // If no profile exists, redirect to onboarding
      if (!profile) {
        return NextResponse.redirect(`${origin}/onboarding`);
      }
    }

    // If a redirect param was provided, use it; otherwise go to dashboard
    const redirectTo = redirect || "/dashboard";
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // No code present, redirect to login
  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent("No authentication code provided.")}`
  );
}
