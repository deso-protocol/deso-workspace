import { TransactionSpendingLimitResponse } from 'deso-protocol-types';
import { TransactionSpendingLimitResponseOptions } from './types';

// walk the derived key spending limit obj and check if the specified permission are good.
export function compareTransactionSpendingLimits(
  expectedPermissions: any,
  actualPermissions: any
): boolean {
  for (const key in expectedPermissions) {
    // if the key is null, it means there are no permissions for this key
    if (actualPermissions[key] === null) {
      return false;
    }

    if (typeof actualPermissions[key] === 'object') {
      return compareTransactionSpendingLimits(
        expectedPermissions[key],
        actualPermissions[key]
      );
    }

    // checks if a permissions value is above the queried limit. For example,
    // if the expected permissions are `SUBMIT_POST: 2` and the actual permissions
    // are `SUBMIT_POST: 1`, then this function will return false. If the expected
    // permissions are querying for multiple permissions values, then if *any* of
    // them are below the queried limit, this function will return false.
    if (expectedPermissions[key] > actualPermissions[key]) {
      return false;
    }
  }

  return true;
}

export function buildTransactionSpendingLimitResponse(
  spendingLimitOptions: Partial<TransactionSpendingLimitResponseOptions>
): TransactionSpendingLimitResponse {
  if (spendingLimitOptions?.IsUnlimited) {
    return {
      IsUnlimited: true,
    };
  }

  const result: TransactionSpendingLimitResponse = {};

  walkObj(
    spendingLimitOptions,
    (val, path) => {
      setDeepValue(result, path, val === 'UNLIMITED' ? 1e9 : val);
    },
    []
  );

  if (
    !result.TransactionCountLimitMap ||
    typeof result.TransactionCountLimitMap?.['AUTHORIZE_DERIVED_KEY'] ===
      'undefined'
  ) {
    result.TransactionCountLimitMap = {
      ...result.TransactionCountLimitMap,
      AUTHORIZE_DERIVED_KEY: 1,
    };
  }

  return result;
}

function walkObj(
  node: any,
  callback: (val: any, path: string[]) => void,
  path: string[] = []
) {
  if (typeof node === 'object' && node !== null) {
    const keys = Object.keys(node);
    for (let i = 0; i < keys.length; i++) {
      walkObj(node[keys[i]], callback, path.concat(keys[i]));
    }
  } else {
    callback(node, path);
  }
}

function setDeepValue(obj: any, path: string[], value: any) {
  const currKey = path[0];

  if (typeof obj[currKey] === 'undefined') {
    obj[currKey] = {};
  }

  if (path.length === 1) {
    obj[currKey] = value;
  } else {
    setDeepValue(obj[currKey], path.slice(1), value);
  }
}
