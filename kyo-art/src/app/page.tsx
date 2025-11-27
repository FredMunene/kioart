"use client";

import Link from "next/link";
import Providers from "@/components/Providers";
import { NavBar } from "@/components/NavBar";
import { ArtworkCard, type ProvenanceStatus } from "@/components/ArtworkCard";

type FeaturedItem = {
  title: string;
  artist: string;
  priceLabel: string;
  saleType: "Fixed" | "Auction";
  status: ProvenanceStatus[];
  org?: string;
  image: string;
};

const featured: FeaturedItem[] = [
  {
    title: "Monochrome Study I",
    artist: "Ayo K.",
    priceLabel: "$3,800",
    saleType: "Fixed" as const,
    status: ["Verified", "IP Registered", "NFT Minted"],
    org: "Baraza",
    image: "https://images.unsplash.com/photo-1523419400524-219afee2b9df?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Echoes in Silk",
    artist: "N. Obiero",
    priceLabel: "Auction • ends in 02:14",
    saleType: "Auction" as const,
    status: ["Verified", "IP Registered"],
    org: "Kisumu House",
    image: "https://images.unsplash.com/photo-1523419400524-0120008f7b11?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Linearity",
    artist: "Mwende",
    priceLabel: "$5,200",
    saleType: "Fixed" as const,
    status: ["Verified", "IP Registered", "NFT Minted"],
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80"
  }
];

export default function Home() {
  return (
    <Providers>
      <NavBar />
      <div className="page-shell">
        <div className="headline">Where Art Proves Itself.</div>
        <p className="subhead">Upload → Verified → IP Registered → List & Sell</p>
        <div className="cta-row">
          <Link className="btn btn-primary" href="/marketplace">
            Browse Art
          </Link>
          <Link className="btn" href="/dashboard">
            List Your Art
          </Link>
        </div>

        <div className="hero">
          {featured.map((item) => (
            <div key={item.title} className="hero-card">
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "grayscale(100%)",
                  transition: "transform 200ms ease, opacity 200ms ease"
                }}
              />
            </div>
          ))}
        </div>

        <div className="section">
          <div className="section-header">
            <p className="section-title">Featured</p>
            <p className="section-hint">Curated drops from affiliated artists</p>
          </div>
          <div className="grid">
            {featured.map((item, idx) => (
              <ArtworkCard
                key={idx}
                title={item.title}
                artist={item.artist}
                priceLabel={item.priceLabel}
                saleType={item.saleType}
                org={item.org}
                status={item.status}
                image={item.image}
                href="/marketplace"
              />
            ))}
          </div>
        </div>
      </div>
    </Providers>
  );
}
