export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// export const getJwtInfo = (user: LoginUser): IdentityJwtRequest => {
//   const { accessLevelHmac, encryptedSeedHex, accessLevel } = user;
//   return {
//     id: uuid(),
//     service: 'identity',
//     method: 'jwt',
//     payload: {
//       accessLevelHmac,
//       encryptedSeedHex,
//       accessLevel,
//     },
//   };
// };
export const throwErrors = (
  requiredAttributes: string[],
  request: Partial<any>
): void => {
  requiredAttributes.forEach((attrName: string) => {
    const doesExist = (request as any)[attrName];
    if (!doesExist) {
      throw Error(`${attrName} is required`);
    }
  });
};
