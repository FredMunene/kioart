import { NextResponse } from "next/server";
import { getServiceSupabaseClient } from "@/lib/supabase";

export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  try {
    const supabase = getServiceSupabaseClient();
    const { data, error } = await supabase
      .from("artworks")
      .select(
        "id,title,description,uri,yakoa_status,yakoa_score,story_ip_id,price_wei,network,metadata"
      )
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Supabase listing error", { id, message: error.message, details: error.details, hint: error.hint, code: error.code });
      throw error;
    }
    if (!data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ artwork: data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load listing";
    console.error("Listing fetch failed", { id, error: message });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
