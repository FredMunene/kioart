## kyo-art – IP-first art marketplace

A provenance-first marketplace for African artists. The platform allows artists to upload their work, verify its authenticity, register intellectual property (IP), and list it for sale (fixed price or auction) with clear rights and payout structures.

### Tech Stack

This project leverages a modern web3 stack, including:
- **Frontend:** [Next.js](https://nextjs.org/) (React Framework)
- **Wallet Integration:** [Coinbase CDP](https://docs.cloud.coinbase.com/cdp/docs) for embedded wallets, simplifying user onboarding.
- **On-chain IP:** [Story Protocol](https://storyprotocol.xyz/) for on-chain IP registration and management.
- **Authenticity:** [Yakoa](https://www.yakoa.com/) to ensure the authenticity of the artwork.
- **Decentralized Storage:** [Pinata](https://www.pinata.cloud/)/[IPFS](https://ipfs.tech/) for decentralized and permanent file storage.
- **Backend & Database:** [Supabase](https://supabase.com/) for data management.
- **Blockchain Interaction:** [Viem](https://viem.sh/) for type-safe Ethereum interactions.

This project was generated with [`@coinbase/create-cdp-app`](https://coinbase.github.io/cdp-web/modules/_coinbase_create-cdp-app.html) using the Next.js template.

### Core Workflows

*   **For Artists:** Connect wallet → Upload artwork → Pin to Pinata/IPFS → Verify with Yakoa → Register IP with Story Protocol → List for sale with clear provenance.
*   **For Buyers:** Browse the marketplace → View detailed provenance information → Purchase or bid on artwork.

## Project Structure

```
src/
├── app/                  # Next.js App Router directory
│   ├── api/              # API endpoints
│   │   └── onramp/       # Onramp-related endpoints
│   │       ├── buy-quote/       # Buy quote generation endpoint for exchange rate and purchase URL
│   │       └── buy-options/     # Available crypto assets and payment currencies
│   ├── favicon.ico      # Application favicon
│   ├── globals.css      # Global styles and theme variables
│   ├── layout.tsx       # Root layout with providers and global UI
│   └── page.tsx         # Home page component
│
├── components/          # Reusable React components
    ├── ClientApp.tsx    # Client-side application wrapper
    ├── FundWallet.tsx   # Example Fund flow
    ├── Header.tsx       # Navigation header with authentication status
    ├── Icons.tsx        # Reusable icon components
    ├── Loading.tsx      # Loading state component
    ├── Providers.tsx    # CDP and theme providers setup
    ├── SignInScreen.tsx # Authentication screen with CDP sign-in flow
    ├── SignedInScreen.tsx # Screen displayed after successful authentication
    ├── theme.ts         # Theme configuration and styling constants
    ├── Transaction.tsx  # Example transaction flow
    └── UserBalance.tsx  # Component to display user's wallet balance
│
└── lib/                 # Shared utilities and helpers
    ├── cdp-auth.ts      # CDP API authentication utilities
    ├── onramp-api.ts    # CDP Onramp API utilities
    └── to-camel-case.ts # Utility for converting snakecase-keyed objects to camelcase-keyed objects
```

## Getting Started

First, make sure you have your CDP Project ID:

1. Sign in or create an account on the [CDP Portal](https://portal.cdp.coinbase.com)
2. Copy your Project ID from the dashboard
3. Go to the [Embedded Wallets CORS settings](https://portal.cdp.coinbase.com/products/embedded-wallets/cors)
4. Click add origin and whitelist `http://localhost:3000` (or wherever your app will run)

Then, copy the `env.example` file to `.env`, and populate the `NEXT_PUBLIC_CDP_PROJECT_ID` with your project id.

### Environment Variables

This project requires several environment variables to be set up for full functionality. Copy the `env.example` to `.env` and fill in the following values:
- `NEXT_PUBLIC_CDP_PROJECT_ID`: Your project ID from the Coinbase CDP Portal.
- `SUPABASE_URL`: Your Supabase project URL.
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key.
- `PINATA_JWT`: Your JWT from Pinata for authenticating uploads.

Now you can start the development server:

Using npm:
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Using yarn:
```bash
# Install dependencies
yarn

# Start the development server
yarn dev
```

Using pnpm:
```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app.

## Features

This template comes with:
- Next.js 15 App Router
- CDP React components for authentication and wallet management
- Example transaction components for Base Sepolia (EVM) and Solana Devnet
- Support for EVM EOA, EVM Smart Accounts, and Solana account types
- Built-in TypeScript support
- ESLint with Next.js configuration
- Viem for type-safe Ethereum interactions
- Optional Onramp API integration (EVM and Solana)

## Learn More

- [CDP Documentation](https://docs.cloud.coinbase.com/cdp/docs)
- [CDP React Documentation](https://docs.cloud.coinbase.com/cdp/docs/react-components)
- [CDP Portal](https://portal.cdp.coinbase.com)
- [Vite Documentation](https://vitejs.dev)
