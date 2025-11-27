
Halliday Payments: Onramp to Any Token on Any Chain

This workshop provides a comprehensive overview of Halliday's payment solutions, designed to simplify blockchain development by abstracting away the complexities of cross-chain transactions and onramps.
Key Products & Concepts

    Halliday Payments: A unified crypto payments network that intelligently routes users through onramps, bridges, and DEXs. It offers a single, customizable widget to handle fiat-to-crypto payments to any token on any chain, supporting providers like Stripe, MoonPay, and Coinbase.
    The Workflow Protocol: The core technology that automates and manages cross-chain execution and business logic. This protocol allows developers to build and deploy complex on-chain applications in hours instead of months by combining existing on-chain primitives without writing new smart contracts.

Developer Workshop: Implementing the Payments Widget

The main part of the session was a hands-on demonstration of how to integrate the Halliday Payments widget into a web application.
Key Steps:

    Get API Keys: Developers can obtain their API keys by contacting Halliday. A self-service dashboard is also in development.
    Implementation: The widget can be embedded with a few lines of code. For a simple HTML page, you just need to include the SDK script:
    <script src="https://cdn.jsdelivr.net/npm/@halliday-sdk/payments@latest/dist/paymentsWidget/index.umd.min.js"></script>
    Configuration: Initialize the widget by calling HallidayPayments.openHallidayPayments() with a configuration object. This includes your API key, the target asset (e.g., 'story:0x' for the native IP token on Story), and display options ('MODAL' or 'EMBED').
    Customization: Pass a customStyles object to the configuration to change colors (primary, background, border, text) to match your application's branding.

Q&A Highlights

    Fees: Fees are calculated dynamically at the time of the transaction, bundling provider fees, bridge costs, and gas prices into a single amount shown to the user.
    Integrations: PayPal is available through some onramp providers. Starknet is not currently supported but can be added upon request.
    Environments: The system works on both mainnets (L1s, L2s) and testnets. Developers can use a sandbox flag to test on-ramps on networks like Sepolia.

Contact & Resources

    Documentation: docs.halliday.xyz
    X/Twitter: @HallidayHQ
    Email for API Keys & Partnerships: partnerships@halliday.xyz

