"use client";

import { useEffect, useState } from "react";
import Providers from "@/components/Providers";
import { NavBar } from "@/components/NavBar";
import { ArtworkCard, type ProvenanceStatus } from "@/components/ArtworkCard";
import { StatusChip } from "@/components/StatusChip";

type ArtworkRow = {
  id: string;
  title: string;
  description?: string;
  uri: string;
  yakoa_status?: string;
  story_ip_id?: string;
};

export default function MarketplacePage() {
  const [artworks, setArtworks] = useState<ArtworkRow[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/artworks");
        const data = (await res.json()) as { artworks?: ArtworkRow[] };
        if (data.artworks) {
          setArtworks(data.artworks);
        }
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const mapStatus = (row: ArtworkRow): ProvenanceStatus[] => {
    const statuses: ProvenanceStatus[] = [];
    if (row.yakoa_status === "Verified") statuses.push("Verified");
    if (row.story_ip_id) statuses.push("IP Registered");
    // NFT Minted would be added once minting is implemented.
    return statuses;
  };

  return (
    <Providers>
      <NavBar />
      <div className="page-shell">
        <div className="section-header">
          <p className="section-title">Marketplace</p>
          <div className="chips">
            <StatusChip label="Verified" />
            <StatusChip label="IP Registered" />
            <StatusChip label="NFT Minted" />
          </div>
        </div>
        <div className="grid">
          {artworks.map((item) => (
            <ArtworkCard
              key={item.id}
              title={item.title}
              artist={item.description ?? "Artist"}
              priceLabel="Listed"
              saleType="Fixed"
              status={mapStatus(item)}
              image={item.uri}
              storyIpId={item.story_ip_id}
              href={`/listing/${item.id}`}
            />
          ))}
        </div>
      </div>
    </Providers>
  );
}
