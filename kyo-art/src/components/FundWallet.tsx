import { FundModal, type FundModalProps } from "@coinbase/cdp-react";
import { useCallback } from "react";

import { getBuyOptions, createBuyQuote } from "@/lib/onramp-api";

/**
 * A component that wraps the FundModal component
 *
 * @param props - The props for the FundWallet component
 * @param props.onSuccess - The callback function to call when the onramp purchase is successful
 * @param props.network - The network to use for the onramp (e.g., "base", "solana")
 * @param props.cryptoCurrency - The crypto currency to purchase (e.g., "eth", "sol")
 * @param props.destinationAddress - The wallet address to send funds to
 * @returns The FundWallet component
 */
export default function FundWallet({
  onSuccess,
  network = "base",
  cryptoCurrency = "eth",
  destinationAddress,
}: {
  onSuccess: () => void;
  network?: string;
  cryptoCurrency?: string;
  destinationAddress: string;
}) {
  const fetchBuyQuote: FundModalProps["fetchBuyQuote"] = useCallback(async params => {
    return createBuyQuote(params);
  }, []);

  const fetchBuyOptions: FundModalProps["fetchBuyOptions"] = useCallback(async params => {
    return getBuyOptions(params);
  }, []);

  return (
    <>
      <FundModal
        country="US"
        subdivision="CA"
        cryptoCurrency={cryptoCurrency}
        fiatCurrency="usd"
        fetchBuyQuote={fetchBuyQuote}
        fetchBuyOptions={fetchBuyOptions}
        network={network}
        presetAmountInputs={[10, 25, 50]}
        onSuccess={onSuccess}
        destinationAddress={destinationAddress}
      />
      <p className="small-text">Warning: This will transact real money.</p>
    </>
  );
}
