"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwErrors = exports.uuid = void 0;
const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
exports.uuid = uuid;
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
const throwErrors = (requiredAttributes, request) => {
    requiredAttributes.forEach((attrName) => {
        const doesExist = request[attrName];
        if (!doesExist) {
            throw Error(`${attrName} is required`);
        }
    });
};
exports.throwErrors = throwErrors;
//# sourceMappingURL=utils.js.map