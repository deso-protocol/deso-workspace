import {
  GetPostsStatelessRequest,
  IdentityJwtRequest,
  IdentitySignRequest,
  LoginUser,
} from '@deso-workspace/deso-types';

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getSignRequest = (
  user: LoginUser,
  transaction: { TransactionHex: string }
): IdentitySignRequest => {
  const { accessLevelHmac, encryptedSeedHex, accessLevel } = user;
  const { TransactionHex } = transaction;

  return {
    id: uuid(),
    service: 'identity',
    method: 'jwt',
    payload: {
      accessLevelHmac,
      encryptedSeedHex,
      accessLevel,
      transactionHex: TransactionHex,
    },
  };
};
export const getJwtInfo = (user: LoginUser): IdentityJwtRequest => {
  const { accessLevelHmac, encryptedSeedHex, accessLevel } = user;
  return {
    id: uuid(),
    service: 'identity',
    method: 'jwt',
    payload: {
      accessLevelHmac,
      encryptedSeedHex,
      accessLevel,
    },
  };
};
export const throwErrors = (
  requiredAttributes: string[],
  request: Partial<GetPostsStatelessRequest>
): void => {
  requiredAttributes.forEach((attrName: string) => {
    const doesExist = (request as any)[attrName];
    if (!doesExist) {
      throw Error(`${attrName} is required`);
    }
  });
};
