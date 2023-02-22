import { desoAddressToEthereumAddress } from './ethereum-utils';

describe('ethereum-utils', () => {
  describe('desoAddressToEthereumAddress', () => {
    it('works', () => {
      expect(
        desoAddressToEthereumAddress(
          'BC1YLiSayiRJKRut5gNW8CnN7vGugm3UzH8wXJiwx4io4FJKgRTGVqF'
        )
      ).toEqual('0x648D0cdA8D9C79fcC3D808fE35c2BF3887bcB6db');
    });
  });
});
