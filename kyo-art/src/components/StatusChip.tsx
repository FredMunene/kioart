"use client";

import clsx from "clsx";

type Status =
  | "Image Uploaded"
  | "Details Saved"
  | "Verified"
  | "Needs Review"
  | "IP Registered"
  | "NFT Minted"
  | "Processing…"
  | "Retry Needed"
  | "Draft"
  | "Live"
  | "Sold";

const tone: Record<Status, string> = {
  "Image Uploaded": "#f5f5f5",
  "Details Saved": "#f5f5f5",
  Verified: "#c6f2c2",
  "Needs Review": "#f4d9a0",
  "IP Registered": "#f5f5f5",
  "NFT Minted": "#f5f5f5",
  "Processing…": "#d0d0d0",
  "Retry Needed": "#f4b4b4",
  Draft: "#b3b3b3",
  Live: "#f5f5f5",
  Sold: "#c6f2c2"
};

export function StatusChip({ label }: { label: Status }) {
  return (
    <span
      className={clsx("chip")}
      style={{
        borderColor: "var(--border)",
        color: tone[label] ?? "#f5f5f5"
      }}
    >
      {label}
    </span>
  );
}
