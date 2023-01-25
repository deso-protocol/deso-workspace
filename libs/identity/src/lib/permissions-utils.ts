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
