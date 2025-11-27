# ADR: kyo-art MVP and Organization Model

## Status
Accepted

## Decision
Adopt **kyo-art** as the product name and treat Baraza Media Lab as one of several optional host organizations where artists can affiliate and, when applicable, store physical art. Build a focused MVP that validates the core value: authenticated, on-chain provenance and monetization for Kenyan art (physical and digital) with a smooth UX for artists and buyers.

## Context
- The project was previously branded around JamiiSanaa; we want a shorter, memorable name for the hackathon launch.
- Host orgs (e.g., Baraza) add real-world trust, storage, and curation. Artists should be able to list independently or under an org; affiliation should deliver clear benefits (badging, curation, payouts, custody).
- Hackathon requirements emphasize IP ownership/protection, composable IP, and integrations across Coinbase (embedded wallets), Story/IPFi, data, and Yakoa authenticity checks.

## MVP Scope (hackathon)
- **Users**: Artists (upload/list), Buyers (browse/purchase/bid), Host admins (approve/badge listings, manage storage inventory).
- **Flows**:
  - Artist signs up with Coinbase Embedded Wallet (email/social), creates profile, selects affiliation: independent or host org (e.g., Baraza).
  - Upload artwork (image/video), add metadata (title, medium, size, location, price, sale type fixed/auction), and flag if physical storage is held by a host org.
  - Run Yakoa API check for originality/authenticity; show score and source; block or flag risky items.
  - On approve, register IP on Story (IPFi) with provenance data; optionally issue fractional/royalty token for secondary markets.
  - Mint NFT certificate (Polygon via CDP wallet) and list for sale; store structured listing data for future analytics (Data track).
  - Buyer browsing, filtering, cart/checkout, bid placement; pay via embedded wallet; show licensing summary and host badge.
- **Host org value (e.g., Baraza)**:
  - Badged listings, optional storage intake and custody tracking, local payouts (e.g., M-Pesa in ops doc), events/featured slots.
  - Org-specific storage pricing and insurance policy fees surfaced at intake; admins can update these terms per org.
  - Simple admin view: approve artists/listings, mark storage received/returned, manage disputes/insurance notes.
- **Sale types**:
  - Fixed price with org-set fees applied.
  - Auctions with start/end time, reserve, and automatic increments; artists can switch between fixed and auction while the listing is unpublished (or create a new listing state if live).
- **Non-goals for MVP**: mobile app, advanced marketing/SEO, full commission workflow, full escrow/legal dispute resolution.

## Why this approach
- Keeps the hackathon demo tight: one coherent flow from authenticity check to Story registration to mint/list/sell with embedded wallets.
- Leverages required tracks: Coinbase wallets (onboarding + payments), IPFi (fractional/royalty option), Data (structured, rights-cleared listings), IP Detection (Yakoa), Creative interface (clean upload/review UI).
- Host org model de-risks physical custody and adds trust without blocking independent artists.

## Open Questions
- Storage policy UX: how to present per-org storage/insurance fees and SLAs for damage/loss in a concise intake flow.
- Licensing UX: what standard rights are granted vs. retained per sale, and how to surface that clearly at checkout/listing detail.
- Auction UX constraints: what can change mid-auction vs. requiring a new listing (to avoid buyer confusion).
