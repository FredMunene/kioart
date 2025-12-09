const gatewayFromEnv =
  (process.env.NEXT_PUBLIC_IPFS_GATEWAY ?? process.env.PINATA_GATEWAY_URL)?.replace(/\/$/, "") ||
  "https://ipfs.io/ipfs";

/**
 * Convert ipfs:// or bare CID to an HTTP gateway URL so images load in browsers.
 */
export function ipfsToHttp(uri?: string | null): string {
  if (!uri) return "";
  if (uri.startsWith("http://") || uri.startsWith("https://")) return uri;
  const cid = uri.startsWith("ipfs://") ? uri.replace("ipfs://", "") : uri;
  return `${gatewayFromEnv}/${cid}`;
}
