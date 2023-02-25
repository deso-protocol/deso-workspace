import { api } from '@deso-core/data';
import { identity } from '@deso-core/identity';

/**
 * Sync up the API and Identity modules with the same nodeURI. This can be overridden by
 * passing a different nodeURI to the configure call. If we never pass a nodeURI as a
 * configuration option, the default configured here will be used.
 */
api.configure({ nodeURI: identity.nodeURI });

/**
 * Public API
 */
export * from '@deso-core/data';
export * from '@deso-core/identity';
export * from 'deso-protocol-types';
export * from './lib/deso-protocol';
export * from './lib/jwt-requests';
export * from './lib/transactions/access-groups';
export * from './lib/transactions/associations';
export * from './lib/transactions/derived-keys';
export * from './lib/transactions/deso-tokens';
export * from './lib/transactions/financial';
export * from './lib/transactions/nfts';
export * from './lib/transactions/social';
