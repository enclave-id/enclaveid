import '@types/golang-wasm-exec';

declare global {
  interface Window {
    // Returns the decoded attestation document
    // Throws an error if the attestation is invalid
    validateAttestation: (base64Attestation: string, debug = false) => string;
  }
}

export {};
