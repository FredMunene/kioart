type PinataUploadResult = {
  cid: string;
  uri: string;
};

function requireEnv(name: string): string {
  const val = process.env[name];
  if (!val) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return val;
}

export async function uploadToPinata(file: File): Promise<PinataUploadResult> {
  const jwt = requireEnv("PINATA_JWT");
  const gateway = process.env.PINATA_GATEWAY_URL ?? "https://gateway.pinata.cloud/ipfs/";
  const apiBase = process.env.PINATA_API_URL ?? "https://api.pinata.cloud";
  const timeoutMs = Number(process.env.PINATA_TIMEOUT_MS ?? 15000);

  // Enforce a max file size (e.g., 2MB) to avoid oversized uploads.
  const maxBytes = 2 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error("File too large. Please upload an image under 2MB.");
  }

  const formData = new FormData();
  formData.append("file", file);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(`${apiBase}/pinning/pinFileToIPFS`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`
      },
      body: formData,
      signal: controller.signal
    });
  } catch (err) {
    clearTimeout(timeout);
    if ((err as any)?.name === "AbortError") {
      throw new Error("Pinata upload timed out. Please retry.");
    }
    throw err;
  }
  clearTimeout(timeout);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pinata upload failed: ${res.status} ${res.statusText} ${text}`);
  }

  const data = (await res.json()) as { IpfsHash: string };
  const cid = data.IpfsHash;
  return { cid, uri: `${gateway}${cid}` };
}

// Node/server-side helper for buffers (e.g., seeding script)
export async function uploadBufferToPinata(
  filename: string,
  buffer: ArrayBuffer | Buffer
): Promise<PinataUploadResult> {
  const jwt = requireEnv("PINATA_JWT");
  const gateway = process.env.PINATA_GATEWAY_URL ?? "https://gateway.pinata.cloud/ipfs/";
  const apiBase = process.env.PINATA_API_URL ?? "https://api.pinata.cloud";
  const timeoutMs = Number(process.env.PINATA_TIMEOUT_MS ?? 15000);

  const blob = new Blob([new Uint8Array(buffer)]);
  const formData = new FormData();
  formData.append("file", blob, filename);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(`${apiBase}/pinning/pinFileToIPFS`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`
      },
      body: formData,
      signal: controller.signal
    });
  } catch (err) {
    clearTimeout(timeout);
    if ((err as any)?.name === "AbortError") {
      throw new Error("Pinata upload timed out. Please retry.");
    }
    throw err;
  }
  clearTimeout(timeout);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pinata upload failed: ${res.status} ${res.statusText} ${text}`);
  }

  const data = (await res.json()) as { IpfsHash: string };
  const cid = data.IpfsHash;
  return { cid, uri: `${gateway}${cid}` };
}
