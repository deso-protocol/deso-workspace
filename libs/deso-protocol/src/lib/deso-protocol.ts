import { api, media } from '@deso-core/data';
import { identity, IdentityConfiguration } from '@deso-core/identity';
import { globalConfigOptions } from './internal';

export type DesoProtocolConfiguration = IdentityConfiguration & {
  /**
   * The fee rate in nanos per KB to use for all transactions. This can be
   * overridden by passing a different fee rate to the transaction specific
   * functions.
   */
  MinFeeRateNanosPerKB?: number;

  /**
   * Optional domain of the server to use for media requests (images, videos,
   * etc.). If not provided, we use the default https://media.deso.org server.
   */
  mediaURI?: string;
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

  if (typeof options.nodeURI === 'string' && options.nodeURI.length > 0) {
    api.configure({ nodeURI: options.nodeURI });
  }

  if (typeof options.mediaURI === 'string' && options.mediaURI.length > 0) {
    media.configure({ mediaURI: options.mediaURI });
  }
};
