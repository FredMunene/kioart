type StoryRegistrationResult = {
  ipId: string;
};

function requireEnv(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required env var: ${name}`);
  return val;
}

/**
 * Register IP with Story Protocol. Adjust endpoint/payload per Story docs.
 * Expects STORY_API_URL (default: https://api.storyapis.com) and STORY_API_KEY in env.
 */
export async function registerStoryIP(payload: {
  title: string;
  description?: string;
  uri: string;
  artist?: string;
}): Promise<StoryRegistrationResult> {
  const baseUrl = process.env.STORY_API_URL ?? "https://api.storyapis.com";
  const apiKey = requireEnv("STORY_API_KEY");

  const res = await fetch(`${baseUrl}/api/v4/ip-assets`, {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: payload.title,
      description: payload.description,
      asset_uri: payload.uri,
      artist: payload.artist
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Story registration failed: ${res.status} ${res.statusText} ${text}`);
  }

  const data = (await res.json()) as { id?: string; ipId?: string };
  const ipId = data.ipId || data.id;
  if (!ipId) {
    throw new Error("Story registration did not return an IP id");
  }
  return { ipId };
}
