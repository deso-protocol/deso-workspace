import { ParentRoutes } from '../../../services/utils';
export const getEnabledRoutes = (): string[] => {
  return Object.keys(ParentRoutes).filter((p) =>
    [
      'identity',
      'miner',
      'metaData',
      'nft',
      'notification',
      'posts',
      'referral',
      'social',
      'transactions',
      'user',
      'wallet',
      // 'dao',
    ].includes(p)
  );
};
