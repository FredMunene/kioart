import { createHash } from "crypto";

type StoryRegistrationResult = {
  ipId: string;
};

function requireEnv(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required env var: ${name}`);
  return val;
}

function sanitizePrivateKey(pk: string): `0x${string}` {
  return pk.startsWith("0x") ? (pk as `0x${string}`) : (`0x${pk}` as `0x${string}`);
}

/**
 * Register IP with Story Protocol using the core SDK.
 * Requires WALLET_PRIVATE_KEY; optionally STORY_NETWORK, RPC_PROVIDER_URL, SPG_NFT_CONTRACT_ADDRESS.
 */
export async function registerStoryIP(payload: {
  title: string;
  description?: string;
  uri: string;
  artist?: string;
}): Promise<StoryRegistrationResult> {
  const pk = process.env.WALLET_PRIVATE_KEY;
  if (!pk) {
    throw new Error("Missing WALLET_PRIVATE_KEY for Story registration");
  }

  const { StoryClient, AeneidNetwork } = await import("@story-protocol/core-sdk");
  const { privateKeyToAccount } = await import("viem/accounts");
  const { http, createWalletClient } = await import("viem");

  const network = process.env.STORY_NETWORK ?? "aeneid";
  const rpc = process.env.RPC_PROVIDER_URL ?? "https://rpc.storyprotocol.net";
  const account = privateKeyToAccount(sanitizePrivateKey(pk));
  const transport = http(rpc);

  // Only aeneid network is mapped here; extend if needed.
  const storyNetwork = AeneidNetwork;

  const client = await StoryClient.newClient({
    network: storyNetwork as any,
    account,
    transport
  } as any);

  // Minimal metadata: we reuse the pinned media URI as both IP and NFT metadata URI.
  const ipMetadataURI = payload.uri;
  const nftMetadataURI = payload.uri;
  const ipMetadataHash = `0x${createHash("sha256").update(payload.uri).digest("hex")}`;
  const nftMetadataHash = ipMetadataHash;

  const spgNftContract = process.env.SPG_NFT_CONTRACT_ADDRESS;

  const response = await (client as any).ipAsset.registerIpAsset({
    nft: {
      type: "mint",
      spgNftContract
    },
    ipMetadata: {
      ipMetadataURI,
      ipMetadataHash,
      nftMetadataURI,
      nftMetadataHash
    }
  });

  const ipId = response?.ipId || response?.txHash;
  if (!ipId) {
    throw new Error("Story registration did not return an IP id");
  }
  return { ipId };
}
