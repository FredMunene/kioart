
Workshop Summary: Coinbase Embedded Wallets

This session, led by Charles Starr from the Coinbase Developer Program (CDP), provides a deep dive into the features and functionality of Coinbase's wallet infrastructure for developers, focusing on the newly launched Embedded Wallets.
What is Coinbase Developer Platform (CDP)?

CDP is the externalized infrastructure that Coinbase offers to developers to help them build on-chain applications. It provides a comprehensive suite of tools, including Paymasters, on-ramps, data APIs, and wallet solutions.
Types of CDP Wallets

Coinbase offers two primary types of wallets that developers can create programmatically via their APIs:

    Server Wallets (Custodial): Secure, API-controlled wallets ideal for automating on-chain actions like executing smart contracts or transferring funds. These are often used for backend processes, AI agents, or on-chain market making where programmatic control and security policies (e.g., spending thresholds) are essential.
    Embedded Wallets (Non-custodial): This is the main focus of the workshop. These wallets provide end-users with a seamless, non-custodial experience directly within an application's UI, removing the complexities of seed phrases and browser extensions.

Core Pillars of CDP Wallets

The wallet products are built on three fundamental principles:

    Security: Utilizes a TEE-backed (Trusted Execution Environment) key custody model, architected by the same team behind the Coinbase exchange's security. Private keys are secured in isolated enclaves.
    DevX (Developer Experience): Designed for simplicity with easy-to-use APIs and SDKs for TypeScript and Python. The goal is to provide a fast path from integration to monetization with zero ongoing maintenance.
    Action-Oriented Wallet: These are more than just wallets; they are powerful tools with integrated features for transacting, funding, swapping, querying data, and even earning on-chain yield on USDC.

Key Features of Embedded Wallets

    Simple User Onboarding: Eliminates the need for seed phrases or passkeys. Users can onboard with familiar methods like email, SMS, or social logins (Google, Apple, X).
    White-labeled UX: Developers have full control over the front-end experience. The UI can be completely customized to feel native to the application, including the option to show or hide the "Secured by Coinbase" branding.
    Coinbase Grade Security: Wallet operations are secured by Coinbase's TEE, ensuring private keys never leave the secure enclave.
    Earn Yield on USDC: A standout feature where app developers earn rewards based on the USDC balances held in their users' embedded wallets, creating a direct monetization path.

