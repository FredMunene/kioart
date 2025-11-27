# Product Requirements Document (kyo-art MVP)

## Summary
A digital art marketplace where artists onboard with embedded wallets, verify originality, register IP on-chain, and list works as fixed-price or timed auctions. Partner organizations (e.g., Baraza) can badge artists, offer storage with their own fees/insurance terms, and help local fulfillment. Buyers browse, bid, and purchase with clear provenance, licensing, and custody visibility.

## Objectives
- Prove a seamless flow from upload → authenticity check → IP registration → mint → list → buy.
- Showcase required integrations: Coinbase Embedded Wallets, Yakoa authenticity, Story/IPFi registration, optional fractional/royalty token.
- Support physical custody via host orgs with transparent storage/insurance terms.
- Deliver a polished demo-ready web experience for the hackathon.

## Users
- Artists: upload/list works, choose sale type, affiliate with an org, manage payouts.
- Buyers: browse/filter, view provenance/licensing, buy or bid.
- Host admins: set storage/insurance fees, approve/badge listings, track custody, manage disputes.

## Core User Stories
- As an artist, I can onboard with email/social and get an embedded wallet to mint and get paid.
- As an artist, I can run an authenticity check (Yakoa) before listing; blocked/flagged items are clearly shown.
- As an artist, I can choose fixed price or auction (with start/end/reserve) and switch before publishing.
- As an artist, I can affiliate with a host org and opt into their storage terms (fees/insurance) for physical pieces.
- As a buyer, I can see provenance (Yakoa score, Story registration, NFT cert) and org badge before purchasing.
- As a host admin, I can set storage/insurance pricing, mark custody intake/return, and approve listings.

## Requirements
- Wallet/auth: Coinbase Embedded Wallets for artists/buyers; profile creation on first login.
- Listings: media upload, metadata, sale type, pricing/reserve, schedule; org affiliation optional.
- Auctions: start/end time, reserve, increments, bid validation, automatic closing.
- Authenticity: Yakoa API check at upload; display score/source; block or flag with rationale.
- IP: Register on Story Protocol with metadata; optional fractional/royalty token issuance; mint NFT certificate.
- Payments: On-chain via embedded wallet; capture org fees/storage/insurance in pricing breakdown; document off-chain payout path for physical (e.g., M-Pesa).
- Buyer UX: browse/search/filter, listing detail with provenance/licensing summary, checkout/bid.
- Admin: storage/insurance fee config per org, artist/listing approval, custody tracking, dispute notes.
- Data: persist structured listing/provenance/bid data for analytics (Data track).

## Non-Goals (MVP)
- Mobile apps; advanced marketing/SEO; full commission workflow; complex escrow/legal dispute automation.

## Success Metrics (demo)
- Successful E2E happy-path: onboard → upload → Yakoa pass → Story registration → mint → list → buy/bid.
- Clear UI surfacing provenance, licensing, and org storage terms.
- Stable auction/fixed-price flows in demo with no critical errors.
