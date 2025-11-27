# Architecture Overview (kyo-art MVP)

## Frontend
- Web app (React/Next.js or similar) with three surfaces: artist portal, buyer marketplace, host admin.
- Integrations: Coinbase Embedded Wallet SDK for auth/wallet; Yakoa API calls on upload; Story/IPFi registration flow; NFT mint trigger.
- Components: upload wizard, listing editor (fixed/auction), listing detail (provenance, licensing, org badge), checkout/bid modal, admin storage console.

## Backend
- API layer (Node/TypeScript or Python) for business logic: listings, auctions, org configs, custody, payments orchestration.
- Webhooks/queues for Yakoa results, Story registration confirmation, mint completion, and auction timers.
- Persistence: relational DB (PostgreSQL) for users, orgs, listings, bids, storage terms, provenance records, and audit logs.
- Caching/real-time: Redis for sessions, rate limiting, and auction/bid updates.

## On-chain / External Integrations
- Coinbase Embedded Wallets: user onboarding, signing, and payments.
- Yakoa API: authenticity/originality scoring at upload; store score/source and flag state.
- Story Protocol (IPFi): IP registration with metadata + optional fractional/royalty token issuance.
- Minting: Polygon (via CDP wallet) for NFT certificates referencing Story IP.
- Optional payouts/off-ramps: document M-Pesa/local rails in ops layer; on-chain settlement via embedded wallet.

## Data & Observability
- Structured data model for listings, provenance (Yakoa, Story tx, mint tx), bids, storage events.
- Basic analytics/logging for uploads, approvals, auctions, purchases, and error tracing.

## Security & Compliance
- Auth via embedded wallets; role-based access (artist, buyer, host admin).
- Validate media uploads and API inputs; rate-limit Yakoa calls; protect webhook endpoints.
- Terms/consent for storage/insurance fees and licensing at listing and checkout.
