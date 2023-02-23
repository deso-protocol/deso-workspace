import { api } from '@deso-core/data';
import { identity, IdentityConfiguration } from '@deso-core/identity';
import { globalConfigOptions } from './internal';

export type DesoProtocolConfiguration = IdentityConfiguration & {
  /**
   * The fee rate in nanos per KB to use for all transactions. This can be
   * overridden by passing a different fee rate to the transaction specific
   * functions.
   */
  MinFeeRateNanosPerKB?: number;
};

/**
 * Set the configuration options for the library. This should be used instead of
 * the individual module configure calls because it ensures the nodeURI is in
 * sync between the API and Identity modules.
 */
export const configure = (options: DesoProtocolConfiguration) => {
  if (typeof options.MinFeeRateNanosPerKB === 'number') {
    globalConfigOptions.MinFeeRateNanosPerKB = options.MinFeeRateNanosPerKB;
  }

  identity.configure(options);
  if (options.nodeURI) {
    api.configure({ nodeURI: options.nodeURI });
  }
};
