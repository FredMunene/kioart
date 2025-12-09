"use client";

import { CDPReactProvider, type Config } from "@coinbase/cdp-react/components/CDPReactProvider";

import { theme } from "@/components/theme";
import "@/lib/polyfills";

interface ProvidersProps {
  children: React.ReactNode;
}

const ethereumAccountType = process.env.NEXT_PUBLIC_CDP_CREATE_ETHEREUM_ACCOUNT_TYPE
  ? process.env.NEXT_PUBLIC_CDP_CREATE_ETHEREUM_ACCOUNT_TYPE === "smart"
    ? "smart"
    : "eoa"
  : "eoa";

const solanaAccountType = process.env.NEXT_PUBLIC_CDP_CREATE_SOLANA_ACCOUNT
  ? process.env.NEXT_PUBLIC_CDP_CREATE_SOLANA_ACCOUNT === "true"
  : false;

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const CDP_CONFIG = {
  projectId: process.env.NEXT_PUBLIC_CDP_PROJECT_ID ?? "",
  ...(ethereumAccountType && {
    ethereum: {
      createOnLogin: ethereumAccountType,
    },
  }),
  ...(solanaAccountType && {
    solana: {
      createOnLogin: solanaAccountType,
    },
  }),
  appName: "kyo-art",
  appLogoUrl: `${appUrl}/kioart-white.png`,
  authMethods: ["email", "sms", "oauth:google", "oauth:apple"],
} as Config;

/**
 * Providers component that wraps the application in all requisite providers
 *
 * @param props - { object } - The props for the Providers component
 * @param props.children - { React.ReactNode } - The children to wrap
 * @returns The wrapped children
 */
export default function Providers({ children }: ProvidersProps) {
  return (
    <CDPReactProvider config={CDP_CONFIG} theme={theme}>
      {children}
    </CDPReactProvider>
  );
}
