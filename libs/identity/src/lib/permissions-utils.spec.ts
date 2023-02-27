import { buildTransactionSpendingLimitResponse } from './permissions-utils';
import { TransactionSpendingLimitResponseOptions } from './types';

describe('permissions-utils', () => {
  describe('buildTransactionSpendingLimits', () => {
    it('sets UNLIMITED values to 1e9', () => {
      const spendingLimitOptions: TransactionSpendingLimitResponseOptions = {
        GlobalDESOLimit: 10000000,
        TransactionCountLimitMap: {
          BASIC_TRANSFER: 1,
          SUBMIT_POST: 'UNLIMITED',
          AUTHORIZE_DERIVED_KEY: 'UNLIMITED',
          CREATE_POST_ASSOCIATION: 'UNLIMITED',
        },
        CreatorCoinOperationLimitMap: {
          BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: {
            any: 'UNLIMITED',
            buy: 'UNLIMITED',
            sell: 2,
            transfer: 'UNLIMITED',
          },
        },
        DAOCoinOperationLimitMap: {
          BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: {
            any: 'UNLIMITED',
            mint: 'UNLIMITED',
            burn: 'UNLIMITED',
            disable_minting: 'UNLIMITED',
            update_transfer_restriction_status: 'UNLIMITED',
            transfer: 'UNLIMITED',
          },
        },
        NFTOperationLimitMap: {
          b1cf68f5eb829f8c6c42abe009f315ee921d46c91cc6bd3b9cab9dc4851addc1: {
            0: {
              any: 'UNLIMITED',
            },
            1: {
              update: 'UNLIMITED',
              accept_nft_bid: 'UNLIMITED',
              nft_bid: 'UNLIMITED',
              transfer: 3,
              burn: 'UNLIMITED',
              accept_nft_transfer: 'UNLIMITED',
            },
          },
        },
        AccessGroupLimitMap: [
          {
            AccessGroupOwnerPublicKeyBase58Check:
              'BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s',
            ScopeType: 'Any',
            AccessGroupKeyName: '',
            OperationType: 'Any',
            OpCount: 'UNLIMITED',
          },
          {
            AccessGroupOwnerPublicKeyBase58Check:
              'BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s',
            ScopeType: 'Scoped',
            AccessGroupKeyName: 'default-key',
            OperationType: 'Any',
            OpCount: 1,
          },
        ],
        AssociationLimitMap: [
          {
            AssociationClass: 'Post',
            AssociationType: 'REACTION',
            AppScopeType: 'Scoped',
            AppPublicKeyBase58Check:
              'BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s',
            AssociationOperation: 'Create',
            OpCount: 'UNLIMITED',
          },
        ],
      };

      expect(
        buildTransactionSpendingLimitResponse(spendingLimitOptions)
      ).toEqual({
        GlobalDESOLimit: 10000000,
        TransactionCountLimitMap: {
          BASIC_TRANSFER: 1,
          SUBMIT_POST: 1e9,
          AUTHORIZE_DERIVED_KEY: 1e9,
          CREATE_POST_ASSOCIATION: 1e9,
        },
        CreatorCoinOperationLimitMap: {
          BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: {
            any: 1e9,
            buy: 1e9,
            sell: 2,
            transfer: 1e9,
          },
        },
        DAOCoinOperationLimitMap: {
          BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: {
            any: 1e9,
            mint: 1e9,
            burn: 1e9,
            disable_minting: 1e9,
            update_transfer_restriction_status: 1e9,
            transfer: 1e9,
          },
        },
        NFTOperationLimitMap: {
          b1cf68f5eb829f8c6c42abe009f315ee921d46c91cc6bd3b9cab9dc4851addc1: {
            0: {
              any: 1e9,
            },
            1: {
              update: 1e9,
              accept_nft_bid: 1e9,
              nft_bid: 1e9,
              transfer: 3,
              burn: 1e9,
              accept_nft_transfer: 1e9,
            },
          },
        },
        AccessGroupLimitMap: [
          {
            AccessGroupOwnerPublicKeyBase58Check:
              'BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s',
            ScopeType: 'Any',
            AccessGroupKeyName: '',
            OperationType: 'Any',
            OpCount: 1e9,
          },
          {
            AccessGroupOwnerPublicKeyBase58Check:
              'BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s',
            ScopeType: 'Scoped',
            AccessGroupKeyName: 'default-key',
            OperationType: 'Any',
            OpCount: 1,
          },
        ],
        AssociationLimitMap: [
          {
            AssociationClass: 'Post',
            AssociationType: 'REACTION',
            AppScopeType: 'Scoped',
            AppPublicKeyBase58Check:
              'BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s',
            AssociationOperation: 'Create',
            OpCount: 1e9,
          },
        ],
      });
    });
    it('sets AUTHORIZE_DERIVED_KEY to 1 if it was not passed', () => {
      const spendingLimitOptions: TransactionSpendingLimitResponseOptions = {
        GlobalDESOLimit: 10000000,
        TransactionCountLimitMap: {
          BASIC_TRANSFER: 1,
        },
      };

      expect(
        buildTransactionSpendingLimitResponse(spendingLimitOptions)
      ).toEqual({
        GlobalDESOLimit: 10000000,
        TransactionCountLimitMap: {
          BASIC_TRANSFER: 1,
          AUTHORIZE_DERIVED_KEY: 1,
        },
      });
    });
    it('zeros all values if IsUnlimited is passed', () => {
      const spendingLimitOptions: TransactionSpendingLimitResponseOptions = {
        IsUnlimited: true,
        GlobalDESOLimit: 10000000,
        TransactionCountLimitMap: {
          BASIC_TRANSFER: 1,
        },
      };

      expect(
        buildTransactionSpendingLimitResponse(spendingLimitOptions)
      ).toEqual({
        IsUnlimited: true,
      });
    });
  });
});
