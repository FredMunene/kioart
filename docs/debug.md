# debug log

- 2024-11-26: `npm install` failed (404) fetching `@coinbase/embedded-wallet-sdk@1.0.0` from npm. Removed the dependency from `package.json` and guarded `lib/walletClient.ts` to surface a clear install error; SDK must be installed separately once the correct package/version is confirmed.
