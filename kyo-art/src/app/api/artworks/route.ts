import { NextResponse } from "next/server";
import { getServiceSupabaseClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getServiceSupabaseClient();
    const { data, error } = await supabase
      .from("artworks")
      .select("id,title,description,uri,yakoa_status,yakoa_score,story_ip_id")
      .order("created_at", { ascending: false });
    if (error) {
      throw error;
    }
    return NextResponse.json({ artworks: data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load artworks";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
