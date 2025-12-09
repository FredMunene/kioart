"use client";

import { useState, useRef } from "react";
import { useEvmAddress } from "@coinbase/cdp-hooks";
import { useRouter } from "next/navigation";
import { StatusChip } from "./StatusChip";

type Step =
  | "Idle"
  | "Image Uploaded"
  | "Details Saved"
  | "Verified"
  | "Needs Review"
  | "IP Registered"
  | "NFT Minted"
  | "Processing…"
  | "Retry Needed";

export function UploadPanel() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [saleType, setSaleType] = useState<"Fixed" | "Auction">("Fixed");
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<Step>("Idle");
  const [message, setMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const { evmAddress } = useEvmAddress();
  const router = useRouter();

  const statuses: Step[] = [
    "Image Uploaded",
    "Details Saved",
    "Verified",
    "IP Registered",
    "NFT Minted"
  ];

  const handleFile = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setFile(files[0]);
    setStep("Image Uploaded");
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please add an image.");
      setStep("Retry Needed");
      return;
    }
    try {
      setStep("Processing…");
      setMessage(null);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("saleType", saleType);

      if (price) {
        const parsed = Number(price);
        if (!Number.isNaN(parsed) && parsed > 0) {
          // Treat input as USDC (6 decimals)
          const usdcUnits = BigInt(Math.round(parsed * 1e6));
          formData.append("priceWei", usdcUnits.toString());
        }
      }
      if (evmAddress) {
        formData.append("payoutAddress", evmAddress);
      }

      console.log(evmAddress)
      // Optional: org/artist fields could be added here.

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      setFile(null);
      setTitle("");
      setDescription("");
      setPrice("");

      // Refresh data so new artwork appears in lists.
      router.refresh();

      // Simulate downstream steps for UX.
      setStep("Details Saved");
      setTimeout(() => setStep("Verified"), 300);
      setTimeout(() => setStep("IP Registered"), 600);
      setTimeout(() => {
        setStep("NFT Minted");
        setMessage("Published. You can now list it.");
      }, 900);

      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (err) {
      setStep("Retry Needed");
      setMessage("Retry Needed");
      console.error(err);
    }
  };

  return (
    <div className="card" style={{ display: "grid", gap: 16 }}>
      <div>
        <p className="artwork-title">Upload New Artwork</p>
        <p className="artwork-meta">Drag an image, add details, choose sale type.</p>
      </div>
      <form ref={formRef} onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
        <label
          htmlFor="file"
          className="artwork-thumb"
          style={{
            border: "1px dashed var(--border)",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            maxWidth: 280,
            margin: "0 auto"
          }}
        >
          <input
            id="file"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files)}
          />
          <span className="artwork-meta">{file ? file.name : "Drag & drop or click to add"}</span>
        </label>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <select
            value={saleType}
            onChange={(e) => setSaleType(e.target.value as "Fixed" | "Auction")}
            style={inputStyle}
          >
            <option value="Fixed">Fixed Price</option>
            <option value="Auction">Auction</option>
          </select>
          <input
            placeholder={saleType === "Fixed" ? "Price" : "Reserve"}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: "fit-content" }}>
          Publish
        </button>
      </form>
      <div className="chips">
        {statuses.map((s, idx) => {
          const completedIndex = statuses.findIndex((v) => v === step);
          const isComplete = completedIndex >= 0 && idx <= completedIndex;
          const chipLabel =
            (isComplete ? s : "Processing…") as
              | "Image Uploaded"
              | "Details Saved"
              | "Verified"
              | "IP Registered"
              | "NFT Minted"
              | "Needs Review"
              | "Processing…";
          return <StatusChip key={s} label={chipLabel} />;
        })}
      </div>
      {message && <p className="artwork-meta">{message}</p>}
    </div>
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
