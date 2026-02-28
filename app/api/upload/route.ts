import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const bucket = (formData.get("bucket") as string) || "portfolio";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { upsert: true });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl });
  } catch {
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
