"use client";

import Providers from "@/components/Providers";
import { NavBar } from "@/components/NavBar";
import { StatusChip } from "@/components/StatusChip";
import Link from "next/link";
import type { ProvenanceStatus } from "@/components/ArtworkCard";

const sample = {
  title: "Afterlight",
  artist: "C. Ochieng",
  priceLabel: "$2,900",
  saleType: "Fixed" as const,
  org: "Baraza",
  status: ["Verified", "IP Registered", "NFT Minted"] as ProvenanceStatus[],
  image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
  storage: "Stored with Baraza"
};

export default function ListingDetailPage() {
  return (
    <Providers>
      <NavBar />
      <div className="page-shell">
        <div className="section-header">
          <p className="section-title">Listing</p>
          <Link className="section-hint" href="/marketplace">
            Back to Marketplace
          </Link>
        </div>
        <div className="two-col">
          <div
            className="artwork-thumb"
            style={{
              aspectRatio: "1",
              backgroundImage: `url(${sample.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              border: "1px solid var(--border)"
            }}
          />
          <div className="card" style={{ display: "grid", gap: 12 }}>
            <p className="artwork-title" style={{ fontSize: 26 }}>
              {sample.title}
            </p>
            <p className="artwork-meta">
              {sample.artist} • {sample.saleType} • {sample.priceLabel}
            </p>
            <p className="artwork-meta">{sample.storage}</p>
            <div className="chips">
              {sample.status.map((s) => (
                <StatusChip key={s} label={s} />
              ))}
            </div>
            <div className="card" style={{ borderColor: "var(--border)" }}>
              {sample.saleType === "Fixed" ? (
                <button className="btn btn-primary" style={{ width: "100%" }}>
                  Buy Now
                </button>
              ) : (
                <div style={{ display: "grid", gap: 8 }}>
                  <input placeholder="Your bid" style={inputStyle} />
                  <button className="btn btn-primary">Place Bid</button>
                </div>
              )}
            </div>
            <div>
              <p className="section-hint" style={{ marginBottom: 6 }}>
                Provenance
              </p>
              <div className="chips">
                <StatusChip label="Verified" />
                <StatusChip label="IP Registered" />
                <StatusChip label="NFT Minted" />
              </div>
            </div>
            <div>
              <p className="section-hint" style={{ marginBottom: 6 }}>
                Fees
              </p>
              <div className="artwork-meta">Price includes standard fees and storage if applicable.</div>
            </div>
            <div>
              <p className="section-hint" style={{ marginBottom: 6 }}>
                Licensing
              </p>
              <div className="artwork-meta">Standard usage rights included.</div>
            </div>
          </div>
        </div>
      </div>
    </Providers>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--fg)",
  fontSize: "14px",
  letterSpacing: "0.02em"
};
