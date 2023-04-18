export const encodeUTF8ToBytes = (str: string): Uint8Array => {
  return new TextEncoder().encode(str);
};

export const decodeBytesToUTF8 = (buf: Uint8Array): string => {
  return new TextDecoder().decode(buf);
};
