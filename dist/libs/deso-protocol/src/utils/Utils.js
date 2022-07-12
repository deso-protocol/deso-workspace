"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignDefaults = exports.throwErrors = exports.convertExtraDataToHex = exports.convertToHex = exports.uuid = void 0;
const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
exports.uuid = uuid;
const convertToHex = (str) => {
    return str
        .split('')
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('');
};
exports.convertToHex = convertToHex;
const convertExtraDataToHex = (extraData) => {
    Object.keys(extraData.ExtraData).forEach((key) => {
        const dataToConvert = extraData.ExtraData[key];
        extraData.ExtraData[key] = (0, exports.convertToHex)(dataToConvert);
    });
    return extraData;
};
exports.convertExtraDataToHex = convertExtraDataToHex;
const throwErrors = (requiredAttributes, request) => {
    requiredAttributes.forEach((attrName) => {
        const doesExist = request[attrName];
        if (!doesExist) {
            throw Error(`${attrName} is required`);
        }
    });
};
exports.throwErrors = throwErrors;
const assignDefaults = (attributesWithDefaults, request) => {
    attributesWithDefaults.forEach((attribute) => {
        const value = request[attribute.name];
        if (value === undefined || value === null) {
            request[attribute.name] = attribute.default;
        }
    });
    return request;
};
exports.assignDefaults = assignDefaults;
// export const;
//# sourceMappingURL=Utils.js.map