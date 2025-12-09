"use client";

import Providers from "@/components/Providers";
import { NavBar } from "@/components/NavBar";
import { StatusChip } from "@/components/StatusChip";
import Link from "next/link";
import type { ProvenanceStatus } from "@/components/ArtworkCard";
import { useEffect, useMemo, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useIsSignedIn, useSendEvmTransaction, useEvmAddress } from "@coinbase/cdp-hooks";
import { createPublicClient, http, encodeFunctionData } from "viem";
import { base } from "viem/chains";
import FundWallet from "@/components/FundWallet";

type Listing = {
  id: string;
  title: string;
  description?: string;
  uri: string;
  artist_id?: string | null;
  yakoa_status?: string;
  story_ip_id?: string;
  price_wei?: string | number | null;
  network?: "base" | "base-sepolia" | string | null;
  metadata?: {
    payout_address?: string;
    sale_type?: string;
  } | null;
};

const USDC_BASE = "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913";
const USDC_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ name: "balance", type: "uint256" }]
  },
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: [{ name: "success", type: "bool" }]
  }
] as const;
const USDC_DECIMALS = 6n;

function formatUsdc(amount: bigint): string {
  const whole = amount / 10n ** USDC_DECIMALS;
  const fraction = amount % 10n ** USDC_DECIMALS;
  const fractionStr = fraction.toString().padStart(6, "0").replace(/0+$/, "");
  return fractionStr ? `${whole}.${fractionStr}` : whole.toString();
}

export default function ListingDetailPage() {
  return (
    <Providers>
      <NavBar />
      <ListingClient />
    </Providers>
  );
}

function ListingClient() {
  const pathname = usePathname();
  const id = useMemo(() => pathname?.split("/").pop() ?? "", [pathname]);
  const { isSignedIn } = useIsSignedIn();
  const { sendEvmTransaction } = useSendEvmTransaction();
  const { evmAddress } = useEvmAddress();
  const publicClient = useMemo(() => createPublicClient({ chain: base, transport: http() }), []);

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">(
    "idle"
  );
  const [usdcBalance, setUsdcBalance] = useState<bigint>(0n);
  const [showOnramp, setShowOnramp] = useState(false);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/listing/${id}`);
        const data = (await res.json()) as { artwork?: Listing; error?: string };
        if (!res.ok || !data.artwork) {
          throw new Error(data.error ?? "Failed to load listing");
        }
        setListing(data.artwork);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to load listing";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const statusChips: ProvenanceStatus[] = useMemo(() => {
    const chips: ProvenanceStatus[] = [];
    if (listing?.yakoa_status === "Verified") chips.push("Verified");
    if (listing?.story_ip_id) chips.push("IP Registered");
    return chips;
  }, [listing]);

  const priceLabel = useMemo(() => {
    if (!listing?.price_wei) return "Price unavailable";
    try {
      const asBigInt = BigInt(listing.price_wei);
      return `${formatUsdc(asBigInt)} USDC`;
    } catch {
      return "Price unavailable";
    }
  }, [listing]);

  const payoutAddress =
    (listing?.metadata?.payout_address as `0x${string}` | undefined) ?? undefined;
  const priceUnits = listing?.price_wei ? BigInt(listing.price_wei) : null;

  const refreshBalance = useCallback(async () => {
    if (!evmAddress) {
      setUsdcBalance(0n);
      return;
    }
    try {
      const bal = await publicClient.readContract({
        address: USDC_BASE,
        abi: USDC_ABI,
        functionName: "balanceOf",
        args: [evmAddress]
      } as any);
      setUsdcBalance(BigInt(bal));
    } catch (err) {
      console.warn("Failed to fetch USDC balance; defaulting to 0", err);
      setUsdcBalance(0n);
    }
  }, [evmAddress, publicClient]);

  useEffect(() => {
    if (isSignedIn && evmAddress) {
      void refreshBalance();
    }
  }, [isSignedIn, evmAddress, refreshBalance]);

  const hasBalance = Boolean(
    isSignedIn &&
      payoutAddress &&
      priceUnits !== null &&
      !Number.isNaN(Number(priceUnits)) &&
      usdcBalance >= (priceUnits ?? 0n)
  );

  const canBuy = Boolean(
    isSignedIn &&
      payoutAddress &&
      priceUnits !== null &&
      !Number.isNaN(Number(priceUnits))
  );

  const handleBuy = async () => {
    if (!payoutAddress || !priceUnits) return;
    if (!hasBalance) {
      setShowOnramp(true);
      return;
    }
    setIsPaying(true);
    setPaymentStatus("processing");
    try {
      const data = encodeFunctionData({
        abi: USDC_ABI,
        functionName: "transfer",
        args: [payoutAddress, priceUnits]
      });
      await sendEvmTransaction({
        transaction: {
          to: USDC_BASE,
          value: 0n,
          data,
          gas: 90000n,
          chainId: 8453,
          type: "eip1559"
        },
        network: "base"
      });
      await refreshBalance();
      setPaymentStatus("success");
    } catch (err) {
      console.error("Payment failed", err);
      setPaymentStatus("error");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="section-header">
        <p className="section-title">Listing</p>
        <Link className="section-hint" href="/marketplace">
          Back to Marketplace
        </Link>
      </div>
      {loading && <p className="artwork-meta">Loading…</p>}
      {error && <p className="artwork-meta">Unable to load: {error}</p>}
      {listing && (
        <div className="two-col">
          <div
            className="artwork-thumb"
            style={{
              aspectRatio: "1",
              backgroundImage: `url(${listing.uri})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              border: "1px solid var(--border)"
            }}
          />
          <div className="card" style={{ display: "grid", gap: 12 }}>
            <p className="artwork-title" style={{ fontSize: 26 }}>
              {listing.title}
            </p>
            <p className="artwork-meta">{listing.description ?? "Artist listing"}</p>
            <div className="chips">
              {statusChips.length === 0 && <StatusChip label="Draft" />}
              {statusChips.map((s) => (
                <StatusChip key={s} label={s} />
              ))}
            </div>
            <div className="card" style={{ borderColor: "var(--border)" }}>
              <div className="artwork-meta" style={{ marginBottom: 12 }}>
                {priceLabel}
              </div>
              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={handleBuy}
                disabled={!canBuy || isPaying}
              >
                {isPaying ? "Processing…" : "Buy Now"}
              </button>
              {!isSignedIn && <p className="artwork-meta">Sign in to purchase.</p>}
              {!payoutAddress && <p className="artwork-meta">Seller wallet not set.</p>}
              {showOnramp && (
                <div
                  className="card"
                  style={{
                    marginTop: 12,
                    border: "1px solid var(--border)",
                    padding: 12,
                    background: "var(--card)"
                  }}
                >
                  <p className="artwork-meta" style={{ marginBottom: 8 }}>
                    Add USDC
                  </p>
                  <FundWallet
                    onSuccess={() => {
                      setShowOnramp(false);
                      void refreshBalance();
                    }}
                    network="base"
                    cryptoCurrency="usdc"
                    destinationAddress={evmAddress ?? ""}
                  />
                </div>
              )}
              {paymentStatus === "success" && <p className="artwork-meta">Paid</p>}
              {paymentStatus === "error" && <p className="artwork-meta">Retry Needed</p>}
            </div>
            <div>
              <p className="section-hint" style={{ marginBottom: 6 }}>
                Provenance
              </p>
              <div className="chips">
                {statusChips.map((s) => (
                  <StatusChip key={s} label={s} />
                ))}
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
      )}
    </div>
  );
}
