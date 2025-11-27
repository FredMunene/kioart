import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type SupabaseEnv = {
  url: string;
  anonKey: string;
  serviceRoleKey?: string;
};

function getSupabaseEnv(): SupabaseEnv {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Supabase env vars SUPABASE_URL and SUPABASE_ANON_KEY are required.");
  }
  return {
    url,
    anonKey,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  };
}

let browserClient: SupabaseClient | null = null;

export function getBrowserSupabaseClient(): SupabaseClient {
  if (browserClient) return browserClient;
  const { url, anonKey } = getSupabaseEnv();
  browserClient = createClient(url, anonKey);
  return browserClient;
}

export function getServiceSupabaseClient(): SupabaseClient {
  const { url, anonKey, serviceRoleKey } = getSupabaseEnv();
  const key = serviceRoleKey ?? anonKey;
  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
