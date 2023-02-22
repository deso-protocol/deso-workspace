import { keccak_256 } from '@noble/hashes/sha3';
import { utils } from '@noble/secp256k1';
import { bs58PublicKeyToBytes } from './crypto-utils';

export const desoAddressToEthereumAddress = (pkBase58Check: string) => {
  const desoPKBytes = bs58PublicKeyToBytes(pkBase58Check).slice(1);
  const ethPKHex = utils.bytesToHex(keccak_256(desoPKBytes)).slice(24);
  // EIP-55 requires a checksum. Reference implementation: https://eips.ethereum.org/EIPS/eip-55
  const checksum = utils.bytesToHex(keccak_256(ethPKHex));

  return Array.from(ethPKHex).reduce(
    (ethAddress, char, index) =>
      ethAddress +
      (parseInt(checksum[index], 16) >= 8 ? char.toUpperCase() : char),
    '0x'
  );
};
