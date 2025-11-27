type VerificationResult = {
  status: "Verified" | "Needs Review";
  score?: number;
};

function requireEnv(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required env var: ${name}`);
  return val;
}

/**
 * Verify an image with Yakoa. Adjust endpoint/payload per Yakoa docs.
 * Expects YAKOA_API_URL and YAKOA_API_KEY in env.
 */
export async function verifyWithYakoa(imageUrl: string): Promise<VerificationResult> {
  const baseUrl = requireEnv("YAKOA_API_URL");
  const apiKey = requireEnv("YAKOA_API_KEY");

  const res = await fetch(`${baseUrl}/verify`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url: imageUrl })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Yakoa verification failed: ${res.status} ${res.statusText} ${text}`);
  }

  const data = (await res.json()) as { score?: number; status?: string };
  const status = (data.status === "Verified" ? "Verified" : "Needs Review") as
    | "Verified"
    | "Needs Review";

  return {
    status,
    score: data.score
  };
}
