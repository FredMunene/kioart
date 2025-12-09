## kyo-art – IP-first art marketplace (hackathon scope)

[live website link](https://kyoart.vercel.app/)

### What we’re building
- Provenance-first marketplace for African artists: upload once, verify, register IP, and list (fixed/auction) with clear rights and payouts.
- Integrations required by tracks: Coinbase CDP (embedded wallets), Story (IP registration), Yakoa (authenticity), Pinata/IPFS (storage), Supabase (data).

### Core flows
- Artist: connect wallet → upload → Pinata/IPFS → Yakoa token check → Story IP registration → list with provenance chips (Verified / IP Registered / NFT Minted).
- Buyer: browse → see provenance → buy/bid; org badges/storage notes.

### Why this matters
- Protects against duplication/theft in AI era; gives creators verifiable proof and predictable payouts; opens secondary IP opportunities (royalties/licensing).

### Tracks we touch
- Creative Front-End, IPFi, Data, IP Detection & Enforcement, Yakoa API challenge.

### Deliverables for demo
- Working upload/listing flow with provenance chips.
- Yakoa verification call + status stored.
- Story registration via SDK with explorer link.
- Supabase data + duplicate CID guardrail.
- Clean UI/UX and short demo video.

### Links
- Coinbase CDP: https://docs.cdp.coinbase.com/embedded-wallets/welcome
- Story SDK: https://docs.story.foundation/
- Yakoa token API (sandbox): https://docs-demo.ip-api-sandbox.yakoa.io/
- Pinata/IPFS: https://docs.pinata.cloud/
