import {
  bufToUvarint64,
  concatUint8Arrays,
  uvarint64ToBuf,
} from './crypto-utils';
import { TransactionNonce } from './transaction-transcoders';
import 'reflect-metadata';
export class BinaryRecord {
  static fromBytes(bytes: Uint8Array): [BinaryRecord, Uint8Array] {
    const result = new this();
    let buffer = bytes;

    const transcoders: TranscoderMetadata[] =
      Reflect.getMetadata('transcoders', result) || [];

    transcoders.forEach(({ name, transcoder }) => {
      let value;
      [value, buffer] = transcoder.read.call(result, buffer);
      (result as any)[name] = value;
    });

    return [result, buffer];
  }

  toBytes(): Uint8Array {
    const transcoders: TranscoderMetadata[] =
      Reflect.getMetadata('transcoders', this) || [];

    let buffer = new Uint8Array(0);
    transcoders.forEach(({ name, transcoder }) => {
      buffer = concatUint8Arrays([
        buffer,
        transcoder.write.call(this, (this as any)[name]),
      ]);
    });

    return buffer;
  }
}

export interface TranscoderMetadata<T = any> {
  name: string;
  transcoder: Transcoder<T>;
}

export function Transcode<T>(transcoder: Transcoder<T>) {
  return (target: any, name: string | symbol) => {
    const transcoders = Reflect.getMetadata('transcoders', target) || [];
    transcoders.push({ name, transcoder });
    Reflect.defineMetadata('transcoders', transcoders, target);
  };
}

export interface Transcoder<T> {
  read: (bytes: Uint8Array) => [T, Uint8Array];
  write: (object: T) => Uint8Array;
}

export interface Serializable {
  toBytes: () => Uint8Array;
}

export interface Deserializable<T> {
  fromBytes: (bytes: Uint8Array) => [T, Uint8Array];
}

export const Uvarint64: Transcoder<number> = {
  read: (bytes) => bufToUvarint64(bytes),
  write: (uint) => uvarint64ToBuf(uint),
};

export const Boolean: Transcoder<boolean> = {
  read: (bytes) => [bytes.at(0) != 0, bytes.slice(1)],
  write: (bool) => {
    return Uint8Array.from([bool ? 1 : 0]);
  },
};

export const Uint8: Transcoder<number> = {
  read: (bytes) => [bytes.at(0) as number, bytes.slice(1)],
  write: (uint) => {
    return Uint8Array.from([uint]);
  },
};

export const FixedBuffer = (size: number): Transcoder<Uint8Array> => ({
  read: (bytes) => [bytes.slice(0, size), bytes.slice(size)],
  write: (bytes) => bytes,
});

export const VarBuffer: Transcoder<Uint8Array> = {
  read: (bytes) => {
    const [size, buffer] = bufToUvarint64(bytes);
    return [buffer.slice(0, size), buffer.slice(size)];
  },
  write: (bytes) => concatUint8Arrays([uvarint64ToBuf(bytes.length), bytes]),
};
export const TransactionNonceTranscoder: Transcoder<TransactionNonce | null> = {
  read: (bytes) => {
    return TransactionNonce.fromBytes(bytes) as [TransactionNonce, Uint8Array];
  },
  write: (nonce) => {
    if (nonce) {
      return concatUint8Arrays([nonce.toBytes()]);
    }
    return new Uint8Array(0);
  },
};

export function Optional<T>(transcoder: Transcoder<T>): Transcoder<T | null> {
  return {
    read: (bytes: Uint8Array) =>
      !bytes.length ? [null, bytes] : transcoder.read(bytes),
    write: (value: T | null) =>
      value === null ? new Uint8Array(0) : transcoder.write(value),
  };
}

export const ChunkBuffer = (width: number): Transcoder<Uint8Array[]> => ({
  read: (bytes) => {
    const countAndBuffer = bufToUvarint64(bytes);
    const count = countAndBuffer[0];
    let buffer = countAndBuffer[1];
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(buffer.slice(0, 33));
      buffer = buffer.slice(33);
    }

    return [result, buffer];
  },
  write: (chunks) =>
    concatUint8Arrays([uvarint64ToBuf(chunks.length), ...chunks]),
});

export const ArrayOf = <
  T extends Serializable,
  C extends Deserializable<T> & { new (): T }
>(
  klass: C
): Transcoder<T[]> => ({
  read: (bytes) => {
    const countAndBuffer = bufToUvarint64(bytes);
    const count = countAndBuffer[0];
    let buffer = countAndBuffer[1];

    const result = [];
    for (let i = 0; i < count; i++) {
      let obj;
      [obj, buffer] = klass.fromBytes(buffer);
      result.push(obj);
    }

    return [result, buffer];
  },
  write: (objects) => {
    const count = uvarint64ToBuf(objects.length);
    return concatUint8Arrays([
      count,
      ...objects.map((object) => object.toBytes()),
    ]);
  },
});

export const Record = <
  T extends Serializable,
  C extends Deserializable<T> & { new (): T }
>(
  klass: C
): Transcoder<T> => ({
  read: (bytes) => klass.fromBytes(bytes),
  write: (object) => object.toBytes(),
});

export const instanceToType = <
  T extends Serializable,
  C extends Deserializable<T> & { new (): T }
>(
  object: T,
  klassMap: { [index: string]: C }
): number => {
  for (const [key, value] of Object.entries(klassMap)) {
    if (object instanceof value) return parseInt(key);
  }
  return -1;
};

export const Enum = <
  T extends Serializable,
  C extends Deserializable<T> & { new (): T }
>(klassMap: {
  [index: string]: C;
}): Transcoder<T> => {
  return {
    read: (bytes) => {
      let buffer = bytes;
      const typeAndBuffer = bufToUvarint64(buffer);
      const type = typeAndBuffer[0];
      buffer = typeAndBuffer[1];

      const sizeAndBuffer = bufToUvarint64(buffer);
      const size = sizeAndBuffer[0];
      buffer = sizeAndBuffer[1];

      return [
        klassMap[type].fromBytes(buffer.slice(0, size))[0],
        buffer.slice(size),
      ];
    },
    write: (object) => {
      const type = uvarint64ToBuf(instanceToType(object, klassMap));
      const bytes = object.toBytes();
      const size = uvarint64ToBuf(bytes.length);

      return concatUint8Arrays([type, size, bytes]);
    },
  };
};
