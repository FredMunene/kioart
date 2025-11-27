import { NextResponse } from "next/server";

import { uploadBufferToPinata } from "@/lib/pinata";
import { getServiceSupabaseClient } from "@/lib/supabase";

type SeedItem = {
  title: string;
  artist?: string;
  image: string;
  saleType: "Fixed" | "Auction";
  priceLabel: string;
  org?: string;
};

const seedArtworks: SeedItem[] = [
  {
    title: "Monochrome Study I",
    artist: "Ayo K.",
    priceLabel: "$3,800",
    saleType: "Fixed",
    org: "Baraza",
    image:
      "https://images.unsplash.com/photo-1523419400524-219afee2b9df?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Echoes in Silk",
    artist: "N. Obiero",
    priceLabel: "Auction • ends soon",
    saleType: "Auction",
    org: "Kisumu House",
    image:
      "https://images.unsplash.com/photo-1523419400524-0120008f7b11?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Linearity",
    artist: "Mwende",
    priceLabel: "$5,200",
    saleType: "Fixed",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Afterlight",
    artist: "C. Ochieng",
    priceLabel: "$2,900",
    saleType: "Fixed",
    org: "Baraza",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Silent Frame",
    artist: "L. Atieno",
    priceLabel: "Auction • ends soon",
    saleType: "Auction",
    org: "Kisumu House",
    image:
      "https://images.unsplash.com/photo-1520624229316-6c1193f48778?auto=format&fit=crop&w=1200&q=80"
  }
];

async function registerMockIP(title: string): Promise<string> {
  // Placeholder for Story Protocol registration; replace with real call when available.
  return `ip-registered-${encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"))}`;
}

export async function POST() {
  try {
    const supabase = getServiceSupabaseClient();
    const results: Array<{ title: string; cid?: string; uri?: string; error?: string }> = [];

    for (const item of seedArtworks) {
      try {
        const res = await fetch(item.image);
        if (!res.ok) {
          throw new Error(`Failed to fetch image ${item.image}`);
        }
        const arrayBuffer = await res.arrayBuffer();
        const pin = await uploadBufferToPinata(`${item.title}.jpg`, arrayBuffer);
        const storyId = await registerMockIP(item.title);

        const { error } = await supabase
          .from("artworks")
          .insert({
            title: item.title,
            description: `${item.title} by ${item.artist ?? "Unknown artist"}`,
            cid: pin.cid,
            uri: pin.uri,
            story_ip_id: storyId
          })
          .select()
          .single();

        if (error) {
          throw error;
        }

        results.push({ title: item.title, cid: pin.cid, uri: pin.uri });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        results.push({ title: item.title, error: message });
      }
    }

    return NextResponse.json({ results });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Seed failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
