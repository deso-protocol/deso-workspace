import Deso from 'deso-protocol';
import { data } from './styles';

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
export const StringifyObject = ({ obj }: any) => {
  return (
    <div className={data}>
      <div className="">{JSON.stringify(obj, null, 2)}</div>
    </div>
  );
};
