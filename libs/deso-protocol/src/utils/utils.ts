import { AppendExtraDataRequest } from 'deso-protocol-types';
export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const convertToHex = (str: string): string => {
  return str
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
};

export const convertExtraDataToHex = (
  extraData: Omit<AppendExtraDataRequest, 'TransactionHex'>
) => {
  Object.keys(extraData.ExtraData).forEach((key) => {
    const dataToConvert = extraData.ExtraData[key];
    extraData.ExtraData[key] = convertToHex(dataToConvert);
  });
  return extraData;
};

export const throwErrors = (
  requiredAttributes: string[],
  request: any
): void => {
  requiredAttributes.forEach((attrName: string) => {
    const doesExist = request[attrName];
    if (!doesExist) {
      throw Error(`${attrName} is required`);
    }
  });
};
