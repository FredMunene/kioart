# kyo-art task list (build-to-demo)

- Define data model for artworks, listings (fixed/auction), orgs, storage terms, and users (artist/buyer/admin).
- Implement auth/onboarding with Coinbase Embedded Wallets (email/social) and create linked user profiles.
- Build artist upload flow: media upload, metadata entry, sale type selection, org affiliation, storage opt-in, pricing/reserve, schedule.
- Integrate Yakoa API for authenticity/originality check at upload; handle block/flag flows.
- Register approved works on Story Protocol (IP registration + optional fractional/royalty token) and mint NFT certificates via embedded wallet.
- Build buyer-facing browse/search/filter, listing detail with provenance, licensing summary, org badge, and checkout/bid flows.
- Implement auction mechanics: start/end, reserve, increments, bid validation, state transitions; fixed-price purchase flow.
- Add host admin view: approve artists/listings, manage storage intake/return, set storage and insurance fees per org, note disputes.
- Wire payments/payouts: on-chain via embedded wallet; document local rails (e.g., M-Pesa) for physical settlement.
- Add basic analytics/logging for listings, bids, sales, and Yakoa results; persist structured data for the Data track.
- Prepare demo script, screenshots, and pitch outline; verify happy-path E2E flow.
