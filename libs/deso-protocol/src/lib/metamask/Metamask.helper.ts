export const getSpendingLimits = (publicKey: string): any => {
  return {
    publicKey: publicKey,
    transactionSpendingLimitResponse: {
      GlobalDESOLimit: 100000000000,
      TransactionCountLimitMap: {
        SUBMIT_POST: 120948,
        FOLLOW: 82943,
      },
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
