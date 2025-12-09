"use client";

import Providers from "@/components/Providers";
import { NavBar } from "@/components/NavBar";
import { UploadPanel } from "@/components/UploadPanel";
import { ArtworkCard, type ProvenanceStatus } from "@/components/ArtworkCard";
import { useIsSignedIn } from "@coinbase/cdp-hooks";
import { AuthButton } from "@coinbase/cdp-react/components/AuthButton";
import { useEffect, useState } from "react";

type DashboardItem = {
  title: string;
  artist: string;
  priceLabel: string;
  saleType: "Fixed" | "Auction";
  status: ProvenanceStatus[];
  image: string;
  storyIpId?: string;
};

function DashboardShell() {
  const { isSignedIn } = useIsSignedIn();
  const [drafts, setDrafts] = useState<DashboardItem[]>([]);
  const [live, setLive] = useState<DashboardItem[]>([]);

  const mapStatus = (row: { yakoa_status?: string; story_ip_id?: string }): ProvenanceStatus[] => {
    const statuses: ProvenanceStatus[] = [];
    if (row.yakoa_status === "Verified") statuses.push("Verified");
    if (row.story_ip_id) statuses.push("IP Registered");
    return statuses;
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/artworks");
        const data = (await res.json()) as { artworks?: Array<{ id: string; title: string; description?: string; uri: string; yakoa_status?: string; story_ip_id?: string }> };
        if (!data.artworks) return;
        const mapped: DashboardItem[] = data.artworks.map((a) => ({
          title: a.title,
          artist: a.description ?? "You",
          priceLabel: "Draft",
          saleType: "Fixed",
          status: mapStatus(a),
          image: a.uri,
          storyIpId: a.story_ip_id
        }));
        setDrafts(mapped);
        setLive(mapped.filter((m) => m.status.includes("IP Registered")));
      } catch (err) {
        console.error(err);
      }
    };
    if (isSignedIn) load();
  }, [isSignedIn]);

  return (
    <>
      <NavBar />
      <div className="page-shell">
        <div className="section-header">
          <p className="section-title">Artist Dashboard</p>
          {!isSignedIn && <div className="section-hint">Connect to manage your works</div>}
        </div>

        {!isSignedIn && (
          <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p className="artwork-title">Sign in to continue</p>
              <p className="artwork-meta">Use your email to connect and start listing.</p>
            </div>
            <AuthButton />
          </div>
        )}

        {isSignedIn && (
          <>
            <div className="section">
              <UploadPanel />
            </div>

            <div className="section">
              <div className="section-header">
                <p className="section-title">Drafts</p>
                <p className="section-hint">Save, edit, then publish when ready.</p>
              </div>
              <div className="grid">
                {drafts.map((item, idx) => (
                  <ArtworkCard
                    key={idx}
                    title={item.title}
                    artist={item.artist}
                    priceLabel={item.priceLabel}
                    saleType={item.saleType}
                    status={item.status}
                    storyIpId={item.storyIpId}
                    image={item.image}
                  />
                ))}
              </div>
            </div>

            <div className="section">
              <div className="section-header">
                <p className="section-title">Live</p>
                <p className="section-hint">Currently visible in the marketplace.</p>
              </div>
              <div className="grid">
                {live.map((item, idx) => (
                  <ArtworkCard
                    key={idx}
                    title={item.title}
                    artist={item.artist}
                    priceLabel={item.priceLabel}
                    saleType={item.saleType}
                    status={item.status}
                    image={item.image}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <Providers>
      <DashboardShell />
    </Providers>
  );
}
