// Provide crypto.randomUUID for older runtimes (e.g., some inpage scripts)
if (typeof globalThis !== "undefined" && typeof globalThis.crypto !== "undefined") {
  const gCrypto = globalThis.crypto as Crypto & { randomUUID?: () => string };
  if (typeof gCrypto.randomUUID !== "function") {
    gCrypto.randomUUID = () => {
      const bytes = new Uint8Array(16);
      gCrypto.getRandomValues(bytes);
      // Adapted RFC4122 v4 format
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;
      const toHex = (n: number) => n.toString(16).padStart(2, "0");
      const b = Array.from(bytes, toHex);
      return `${b[0]}${b[1]}${b[2]}${b[3]}-${b[4]}${b[5]}-${b[6]}${b[7]}-${b[8]}${b[9]}-${b[10]}${b[11]}${b[12]}${b[13]}${b[14]}${b[15]}`;
    };
  }
}
