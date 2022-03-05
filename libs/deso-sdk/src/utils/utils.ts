import { LoginUser } from '@deso-workspace/deso-types';

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getSignerInfo = (
  user: LoginUser,
  transaction: { TransactionHex: string }
): any => {
  const { accessLevelHmac, encryptedSeedHex, accessLevel } = user;
  const { TransactionHex } = transaction;
  return {
    accessLevelHmac,
    encryptedSeedHex,
    accessLevel,
    transactionHex: TransactionHex,
  };
};
