import { TxnString } from 'deso-protocol-types';

/**
 *
 * @returns a spending limit object for the metamask sign in flow
 */
export const getSpendingLimitsForMetamask = (): any => {
  return {
    GlobalDESOLimit: 1000000000,
    TransactionCountLimitMap: {
      [TxnString.TxnStringSubmitPost]: 120000,
      [TxnString.TxnStringUpdateProfile]: 120000,
      [TxnString.TxnStringAuthorizeDerivedKey]: 120000,
    },
  };
};

export const PUBLIC_KEY_PREFIXES = {
  mainnet: {
    bitcoin: [0x00],
    deso: [0xcd, 0x14, 0x0],
  },
  testnet: {
    bitcoin: [0x6f],
    deso: [0x11, 0xc2, 0x0],
  },
};

export const uint64ToBufBigEndian = (uint: number): Buffer => {
  const result = [];
  while (BigInt(uint) >= BigInt(0xff)) {
    result.push(Number(BigInt(uint) & BigInt(0xff)));
    uint = Number(BigInt(uint) >> BigInt(8));
  }
  result.push(Number(BigInt(uint) | BigInt(0)));
  while (result.length < 8) {
    result.push(0);
  }
  return new Buffer(result.reverse());
};

export const uvarint64ToBuf = (uint: number): Buffer => {
  const result = [];

  while (uint >= 0x80) {
    result.push((uint & 0xff) | 0x80);
    uint >>>= 7;
  }

  result.push(uint | 0);

  return new Buffer(result);
};
