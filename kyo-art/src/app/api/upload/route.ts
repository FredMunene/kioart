import { NextResponse } from "next/server";
import { uploadToPinata } from "@/lib/pinata";
import { getServiceSupabaseClient } from "@/lib/supabase";
import { registerWithYakoa } from "@/lib/yakoa";
import { registerStoryIP } from "@/lib/story";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const title = formData.get("title")?.toString() ?? "Untitled";
    const description = formData.get("description")?.toString() ?? "";
    const artistId = formData.get("artistId")?.toString() ?? null;

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "file is required" }, { status: 400 });
    }

    const pin = await uploadToPinata(file);

    let verification:
      | {
          status: "Verified" | "Needs Review";
          score?: number;
          tokenId?: string;
        }
      | undefined;
    let story: { ipId: string } | undefined;

    // Run Yakoa verification (optional if env missing)
    try {
      verification = await registerWithYakoa(pin.cid, pin.uri, title);
    } catch (err) {
      console.warn("Yakoa verification skipped/failed:", err);
    }

    // Register IP with Story (optional if env missing)
    try {
      story = await registerStoryIP({ title, description, uri: pin.uri });
    } catch (err) {
      console.warn("Story registration skipped/failed:", err);
    }

    let record: unknown = null;
    try {
      const supabase = getServiceSupabaseClient();
      const { data, error } = await supabase
        .from("artworks")
        .insert({
          title,
          description,
          cid: pin.cid,
          uri: pin.uri,
          artist_id: artistId,
          yakoa_status: verification?.status,
          yakoa_score: verification?.score,
          yakoa_token_id: verification?.tokenId,
          story_ip_id: story?.ipId
        })
        .select()
        .single();
      if (error) {
        const conflict = (error as { code?: string })?.code === "23505";
        if (conflict) {
          return NextResponse.json(
            { error: "This image already exists. Please upload a new artwork." },
            { status: 409 }
          );
        }
        throw error;
      }
      record = data;
    } catch (dbErr) {
      console.error("Supabase insert failed", dbErr);
    }

    return NextResponse.json(
      {
        cid: pin.cid,
        uri: pin.uri,
        yakoa: verification,
        story,
        record
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
