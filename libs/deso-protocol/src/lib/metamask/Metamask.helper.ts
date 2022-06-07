import { TxnString } from 'deso-protocol-types';

export const getSpendingLimits = (): any => {
  return {
    GlobalDESOLimit: 1000000000,
    TransactionCountLimitMap: {
      [TxnString.TxnStringSubmitPost]: 120948,
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
