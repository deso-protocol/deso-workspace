import { webcrypto } from 'crypto';
import { TextDecoder, TextEncoder } from 'util';

beforeAll(() => {
  setupTestPolyfills();
});

function setupTestPolyfills() {
  // https://davidwalsh.name/window-crypto-node
  globalThis.crypto = webcrypto as unknown as Crypto;
  // NOTE: for some reason the Uint8Array returned by node's implementation of
  // TextEncoder.encode does not compare properly when using instanceof in the
  // browser to check if it is a Uint8Array.  Here we just wrap the original
  // implementation so that instanceof (used by @noble crypto packages) works.
  const originalEncode = TextEncoder.prototype.encode;
  TextEncoder.prototype.encode = function (str: string) {
    return new Uint8Array(originalEncode.call(this, str));
  };
  globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
  globalThis.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
}
