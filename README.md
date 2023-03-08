# Deso Workspace

![Deso](./deso.jpg)

`deso-workspace` is a monorepo containing javascript/typescript libraries for working with the [deso blockchain](https://deso.org)

## Installation

```sh
npm i deso-protocol
```

## Configuration

```ts
import { configure } from 'deso-protocol';

// configure takes all of the same options that the identity
// library's configure method takes: https://github.com/deso-protocol/deso-workspace/tree/main/libs/identity#configuration
// with the addition of the MinFeeRateNanosPerKB value that will be used for all transactions.
configure({
  spendingLimitOptions: {
    GlobalDESOLimit: 1000000000,
    TransactionCountLimitMap: {
      SUBMIT_POST: 4,
    },
  }
  // this is optional, if not passed the default of 1500 will be used.
  MinFeeRateNanosPerKB: 1000,
})
```

See [the identity configuration options](https://github.com/deso-protocol/deso-workspace/tree/main/libs/identity#configuration) for reference.

## Usage

### Identity: (logging in and out, creating new accounts, etc)

```ts
import { identity } from 'deso-protocol';

identity.login();
identity.logout();
```

See [the identity usage docs](https://github.com/deso-protocol/deso-workspace/tree/main/libs/identity#usage) for reference.

### Data: fetching data from a node

```ts
import { getUsersStateless, getPostsStateless } from 'deso-protocol';

const users = await getUsersStateless({
  PublicKeysBase58Check: [key1, key2, ...rest],
});

const posts = await getPostsStateless({ NumToFetch: 20 });
```

See the [backend api documentation](https://docs.deso.org/deso-backend/api) for reference.
See an exhaustive list of the available data fetching functions [here](https://github.com/deso-protocol/deso-workspace/blob/main/libs/data/src/lib/data.ts#L73).

### Transactions: Writing data to the blockchain

The deso-protocol library will handle signing and submitting transactions for
confirmation for you. All you need to do is construct them by providing the raw
data.

```ts
import { submitPost } from 'deso-protocol';

const txInfo = submitPost({
  UpdaterPublicKeyBase58Check: currentUser.publicKey,
  BodyObj: {
    Body: 'My first post on DeSo!',
    ImageURLs: [],
    VideoURLs: [],
  },
});
```

See the [transaction construction api documentation](https://docs.deso.org/deso-backend/construct-transactions) for reference.
See an exhaustive list of the available transaction construction functions [here](https://github.com/deso-protocol/deso-workspace/tree/beta/libs/deso-protocol/src/lib/transactions)
