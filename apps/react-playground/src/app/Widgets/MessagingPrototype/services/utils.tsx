import Deso from 'deso-protocol';
import { dataClass } from '../consts/styles';

export const alertUserIfNoFunds = async (deso: Deso): Promise<boolean> => {
  const PublicKeysBase58Check = deso.identity.getUserKey() as string;
  const response = await deso.user.getUsersStateless({
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
    <div className={dataClass}>
      <div>{JSON.stringify(obj, null, 2)}</div>
    </div>
  );
};
export const truncateDesoHandle = (key: string) => {
  if (!key) return '';
  if (key.length <= 12) {
    return key;
  }
  return `${key.substring(0, 7)}....${key.substring(
    key.length - 4,
    key.length
  )}`;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
