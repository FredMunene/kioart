"use client";

import Link from "next/link";
import { StatusChip } from "./StatusChip";

export type ProvenanceStatus = "Verified" | "IP Registered" | "NFT Minted";
export type BadgeStatus =
  | "Draft"
  | "Live"
  | "Sold"
  | "Image Uploaded"
  | "Details Saved"
  | "Needs Review";

type ArtworkCardProps = {
  id?: string;
  title: string;
  artist: string;
  priceLabel: string;
  saleType: "Fixed" | "Auction";
  org?: string;
  status: ProvenanceStatus[];
  badge?: BadgeStatus;
  storyIpId?: string;
  image?: string;
  href?: string;
};

export function ArtworkCard({
  id,
  title,
  artist,
  priceLabel,
  saleType,
  org,
  status,
  badge,
  storyIpId,
  image,
  href
}: ArtworkCardProps) {
  const content = (
    <div className="card artwork-card">
      <div
        className="artwork-thumb"
        style={{
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {!image && <div style={{ width: "100%", height: "100%", background: "#111" }} />}
      </div>
      <div>
        <p className="artwork-title">{title}</p>
        <p className="artwork-meta">
          {artist} • {saleType} • {priceLabel}
        </p>
        {org && <p className="artwork-meta">Stored with {org}</p>}
        <div className="chips" style={{ marginTop: 8 }}>
          {badge && <StatusChip label={badge} />}
          {status.map((s) => (
            <StatusChip key={s} label={s} />
          ))}
        </div>
        {storyIpId && (
          <p className="artwork-meta" style={{ marginTop: 8 }}>
            <a
              href={`https://explorer.story.foundation/ipa/${storyIpId}`}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "underline" }}
            >
              IP confirmed
            </a>
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} id={id}>
        {content}
      </Link>
    );
  }
  return content;
}
