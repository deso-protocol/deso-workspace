import Deso from 'deso-protocol';

export const alertUserIfNoFunds = async (deso: Deso): Promise<boolean> => {
  const PublicKeysBase58Check = deso.identity.getUserKey() as string;
  const response = await deso.user.getUserStateless({
    PublicKeysBase58Check: [PublicKeysBase58Check],
  });
  if (!response?.UserList || response.UserList[0].BalanceNanos < 0) {
    alert(`${PublicKeysBase58Check}, user has no funds, please login`);
    return false;
  }
  return response.UserList[0].BalanceNanos < 0;
};
