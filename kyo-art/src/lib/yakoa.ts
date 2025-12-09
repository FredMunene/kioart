import { createHash } from "crypto";

type VerificationResult = {
  status: "Verified" | "Needs Review";
  score?: number;
  tokenId?: string;
};

function requireEnv(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required env var: ${name}`);
  return val;
}

const POSITIVE_STATUSES = ["authorized", "original", "high_originality", "high-originality"];

function mapStatus(raw?: string): "Verified" | "Needs Review" {
  if (!raw) return "Needs Review";
  const normalized = raw.toLowerCase();
  return POSITIVE_STATUSES.includes(normalized) ? "Verified" : "Needs Review";
}

function toHexId(seed: string, full = false): string {
  const hex = createHash("sha256").update(seed).digest("hex");
  if (full) return `0x${hex}`; // 32-byte (64 hex chars) hash for tx ids
  return `0x${hex.slice(0, 40)}`; // shorter id to satisfy token id pattern
}

/**
 * Register media with Yakoa and return token info.
 * Expects YAKOA_API_URL (e.g., https://docs-demo.ip-api-sandbox.yakoa.io/docs-demo) and YAKOA_API_KEY in env.
 * Uses POST /token as per sandbox docs.
 */
export async function registerWithYakoa(id: string, mediaUrl: string, title?: string): Promise<VerificationResult> {
  const baseUrl = process.env.YAKOA_API_URL ?? "https://docs-demo.ip-api-sandbox.yakoa.io/docs-demo";
  const apiKey = requireEnv("YAKOA_API_KEY");
  const tokenId = toHexId(id);
  const creatorId = process.env.YAKOA_CREATOR_ID ?? tokenId;
  const nowIso = new Date().toISOString();
  const mintTxHash = toHexId(id + "-tx", true);

  const res = await fetch(`${baseUrl}/token`, {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: tokenId,
      mint_tx: {
        hash: mintTxHash,
        block_number: 0,
        timestamp: nowIso
      },
      creator_id: creatorId,
      metadata: {
        name: title ?? "Untitled"
      },
      media: [
        {
          media_id: "primary",
          url: mediaUrl
        }
      ]
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Yakoa token registration failed: ${res.status} ${res.statusText} ${text}`);
  }

  const data = (await res.json()) as { id?: string; status?: string; score?: number };
  return {
    status: mapStatus(data.status),
    score: data.score,
    tokenId: data.id
  };
}

/**
 * Fetch an existing Yakoa token to refresh status/score.
 */
export async function getYakoaToken(tokenId: string): Promise<VerificationResult> {
  const baseUrl = process.env.YAKOA_API_URL ?? "https://docs-demo.ip-api-sandbox.yakoa.io/docs-demo";
  const apiKey = requireEnv("YAKOA_API_KEY");

  const res = await fetch(`${baseUrl}/token/${tokenId}`, {
    headers: {
      "X-API-Key": apiKey
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Yakoa token fetch failed: ${res.status} ${res.statusText} ${text}`);
  }

  const data = (await res.json()) as { id?: string; status?: string; score?: number };
  return {
    status: mapStatus(data.status),
    score: data.score,
    tokenId: data.id
  };
}
