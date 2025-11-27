
Buildathon Workshop Summary: Story Protocol SDK & Ava Studio AI Video

This session features two back-to-back workshops designed for participants in the Story Protocol Buildathon, covering both technical SDK implementation and creative AI video generation.
Part 1: Building with the Story Protocol SDK (00:03 - 30:22)

Jacob from Story provides a comprehensive walkthrough of the Story Protocol's TypeScript and Python SDKs, designed to simplify interaction with the protocol for developers.
Key Takeaways:

    SDK Overview: The workshop introduces both the TypeScript and Python SDKs, highlighting their full compatibility and feature parity.
    IP Lifecycle Demo: A practical demo showcases the core workflow on Story:
        Uploading IP: Registering your intellectual property on-chain.
        Defining License Terms: Attaching terms like Open Use, Non-Commercial, Commercial Use, or Commercial Remix to your IP.
        Protecting IP: Enforcing these terms through a programmable legal license.
    Code Walkthrough: The session dives into a sample TypeScript repository, demonstrating how to execute key functions:
        registerIpAsset: How to register a new IP, including metadata for title, creators, and media files.
        mintLicenseTokens: How another user can mint a license to use the registered IP, adhering to the set terms (e.g., paying a minting fee).
        claimRevenue: How the original IP owner can claim royalties or fees collected from licensing.
    Infringement Checks: The importance of providing media hashes is explained for the protocol's commercial infringement checks, which verify originality.

Part 2: Directing AI with Ava Studio (30:23 - 01:03:06)

Bitcoin Palmer and CK from the Hologram team introduce Ava Studio, an AI video production suite, and demonstrate its powerful features for the AI video bounty.
Key Features & Demos:

    Templates: A quick way to start by using pre-engineered prompts based on viral video formats. Users can simply swap in their own characters or assets (like Story's mascot, Ippy) to create new content.
    Director Mode: This feature allows users to describe a story or scene in natural language. The AI generates a "Video Bible" outlining the visual style, assets, and scenes, which the user can then approve or modify before final video generation. This simplifies complex storytelling.
    Manual Mode: For full creative control, users can build a video from scratch. This involves:
        Prompting for individual images and video clips.
        Editing and regenerating specific elements (e.g., changing a character's outfit in a scene).
        Assembling the generated assets on a timeline.
    Multi-Model Aggregation: Ava Studio integrates various top-tier AI models (e.g., Seedance, Veo 3.1, Hai L-o) and allows users to choose the best one for their needs based on cost, speed, and quality.


Story Protocol Buildathon: Partner Workshops (ABV.dev & Dune Analytics)

This session provides builders with two powerful demonstrations from Story Protocol partners, showcasing tools to enhance their projects.
Part 1: ABV.dev - Tracing and Registering AI-Generated IP

The first workshop, led by Sahir, introduces ABV.dev, a platform designed for tracing, debugging, and securing generative AI applications.

    Core Functionality: ABV provides a gateway to trace LLM requests, monitor costs, and ensure application security.
    Setup Process: The demo walks through a quick start guide:
        Creating a new account on the ABV platform.
        Generating an API key for your project.
        Using the Python SDK to make an LLM call through the ABV gateway, which automatically traces the entire operation.
    Story Protocol Integration: The key highlight is the direct connector to Story Protocol. This feature enables developers to register AI-generated outputs (like text from an LLM or even the prompts themselves) as on-chain intellectual property.

Key Takeaway: ABV.dev offers a streamlined method to add a layer of traceability and ownership to AI outputs, allowing builders to prove provenance and register their creations on Story Protocol with minimal setup.
Part 2: Dune Analytics - Querying On-Chain Story Data

The second workshop, presented by Rahul, focuses on Dune Analytics, a powerful platform for making on-chain data accessible and understandable.

    Data Layers: Dune processes blockchain data into three layers: Raw (unprocessed), Decoded (human-readable contracts), and Curated (aggregated tables like NFT trades).
    How-To Guide:
        Querying Data: Use the Dune query editor to write SQL queries against Story Protocol's on-chain data tables (e.g., story.transactions, story.logs).
        Decoding Contracts: Submit your project's smart contract address to Dune to automatically generate human-readable tables for its specific events and functions.
        Creating Visualizations: Turn query results into various charts (pie, bar, line) to represent data visually.
        Building Dashboards: Combine multiple visualizations and tables into a comprehensive, shareable dashboard to tell a complete story about your project's activity.

Key Takeaway: Dune empowers developers to analyze, visualize, and share deep insights about their project's usage and on-chain interactions on Story Protocol, using a powerful SQL-based interface.
