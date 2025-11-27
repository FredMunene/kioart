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

  // Enforce a max file size (e.g., 2MB) to avoid oversized uploads.
  const maxBytes = 8 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error("File too large. Please upload an image under 2MB.");
  }

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`
    },
    body: formData
  });

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
  const blob = buffer instanceof Buffer ? new Blob([buffer]) : new Blob([buffer]);
  const formData = new FormData();
  formData.append("file", blob, filename);

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`
    },
    body: formData
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pinata upload failed: ${res.status} ${res.statusText} ${text}`);
  }

  const data = (await res.json()) as { IpfsHash: string };
  const cid = data.IpfsHash;
  return { cid, uri: `${gateway}${cid}` };
}
