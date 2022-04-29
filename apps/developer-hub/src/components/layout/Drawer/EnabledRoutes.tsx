import { ParentRoutes } from '../../../services/utils';
export const getEnabledRoutes = (): string[] => {
  return Object.keys(ParentRoutes).filter((p) =>
    [
      'dao',
      'identity',
      'metaData',
      'media',
      'miner',
      'nft',
      'notification',
      'posts',
      'referral',
      'social',
      'transactions',
      'user',
      'wallet',
    ].includes(p)
  );
};
