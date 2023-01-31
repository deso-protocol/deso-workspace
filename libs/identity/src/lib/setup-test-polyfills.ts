import { webcrypto } from 'crypto';
import { TextDecoder } from 'util';

export function setupTestPolyfills() {
  // https://davidwalsh.name/window-crypto-node
  globalThis.crypto = webcrypto as unknown as Crypto;
  globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
}
