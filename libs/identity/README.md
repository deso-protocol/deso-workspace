# @deso-core/identity

### Disclaimer

This is a brand new library and is a WIP. It has not been battle tested thoroughly and there are surely edge cases and bugs to be addressed and fixed.

## Quick start

```ts
import { identity } from '@deso-core/identity';

// Subscribe to identity state changes (user login/logout, permissions updated,
// etc).  This is useful for binding your preferred framework's state management
// system to the identity instance internal state. The function you provide to
// `subscribe` will be called anytime identity state changes.
identity.subscribe((state) => {
  // The current user object contains the user's current permissions
  // (TransactionCountLimitMap).  This value will be updated when the logged in
  // user changes or when the permissions change for the current user.  read
  // more about the transaction count limit map here
  // https://docs.deso.org/for-developers/backend/blockchain-data/basics/data-types#transactionspendinglimitresponse
  const currentUser = state.currentUser;

  // A list of all users that a given user has logged in with (excluding
  // currentUser).  This is useful if you want to show a list of accounts and
  // provide a way to switch accounts easily.
  const alernateUsers = state.alternateUsers;
});

// Start a login flow
await identity.login();

// Start a logout flow
await identity.logout();

// Switch users (for apps that manage multiple accounts for a single user).
// NOTE: The publicKey here must be a user that has previously logged in.
identity.setActiveUser(publicKey);

// Generate a jwt for making authenticated requests via `Authorization` http
// header.
await identity.jwt();

// Sign and submit a transaction with auto retry if the user's derived key has
// not been authorized yet.  NOTE: This will throw if the user has not been
// granted the proper permissions yet.
const buildTx = () => axios.post('https://node.deso.org/api/v0/submit-post');
const submittedTx = await identity.signAndSubmit(buildTx);

// For more advanced use cases, you might want to handle signing, submitting,
// and retrying yourself. Here's an example of handling each step of the process
// yourself. NOTE: you will have to handle any errors manually with this
// approach.
const postTransaction = await axios.post(
  'https://node.deso.org/api/v0/submit-post'
);
const signedTx = await identity.signTx(postTransaction.TransactionHex);
const submittedTx = await identity.submitTx(signedTx);

// Checking for permissions is straightforward. Here we check if our app can
// post on behalf of a user Read more about the transaction count limit map here
// https://docs.deso.org/for-developers/backend/blockchain-data/basics/data-types#transactionspendinglimitresponse
// This returns a boolean value synchronously.
const hasPermission = identity.hasPermissions({
  TransactionCountLimitMap: {
    SUBMIT_POST: 1,
  },
});

// Here we request approval for permissions from a user.  This will present the
// user with the deso identity approve derived key UI.
if (!hasPermissions) {
  await identity.requestPermissions({
    TransactionCountLimitMap: {
      SUBMIT_POST: 1,
    },
  });
}
```

### Configuration

**Make sure to call configure prior to calling any other identity methods.**

```ts
import { identity } from '@deso-core/identity';

// NOTE: For most web apps no configuration is *required*, but here are some
// common use cases you might want to know about.
identity.configure({
  // Optional redirect URI. This is mostly useful for native mobile use cases.
  // Most web applications will not want to use it. If provided, we do a full
  // redirect to the identity domain and pass data via query params back to the
  // provided uri.
  redirectURI: 'https://mydomain.com/my-redirect-path',

  // This will be associated with all of the derived keys that your application
  // authorizes.
  appName: 'My Cool App',

  // Here we indicate the permissions a user will be asked to approve when they
  // log into your application. You may specify as many or as few permissions up
  // front as you want. You may choose not to request any permissions up front
  // and that's okay! Just remember that you will need to request them in your
  // app progressively, and you can always request as many or as few as you want
  // using the `requestPermissions` method.  See more about these options here
  // https://docs.deso.org/for-developers/backend/blockchain-data/basics/data-types#transactionspendinglimitresponse
  spendingLimitOptions: {
    // NOTE: this value is in Deso nanos, so 1 Deso * 1e9
    GlobalDESOLimit: 1 * 1e9 // 1 Deso
    // Map of transaction type to the number of times this derived key is
    // allowed to perform this operation on behalf of the owner public key
    TransactionCountLimitMap: {
      BASIC_TRANSFER: 2, // 2 basic transfer transactions are authorized
      SUBMIT_POST: 4, // 4 submit post transactions are authorized
    },
  }
})
```

Why a new library? This library is intended to solve many of the issues we have
with the existing
[deso-protocol](https://github.com/deso-protocol/deso-workspace/tree/master/libs/deso-protocol)
library:

- `deso-protocol` manages signing by accessing a user's master key pair via the
  identity [iframe
  API](https://docs.deso.org/for-developers/identity/iframe-api/basics). This
  requires users to enable access to third party cookies and local storage on many
  browsers (Brave, Safari on IOS, Chrome in incognito mode, etc).
  - Since this library is based on derived keys, it does not need to use
    the iframe API _at all_. We can sign transactions, encrypt, decrypt, and generate
    signed JWTs directly using derived keys, which means this works out of the box
    in pretty much any browser environment since it doesn't rely on third party
    storage.
- `deso-protocol` requires developers to specify an "access level" when logging
  in, and depending on the access level it can cause each transaction to require
  explicit approval from users.
  - Because we are using derived keys, there is no longer a need to request an
    "access level" when users log into your app. Instead, you request the
    specific permissions your app needs, when it needs them. Once these
    permissions have been requested, you'll never need to ask users to approve
    transactions going forward which makes it easier to build better user
    experiences.
- `deso-protocol` depends on many node backend packages and requires configuring your
  build system to include node polyfills.
  - This library does not depend on any backend packages. Everything here is
    browser friendly. Just npm install and use this immediately without any
    awkward and confusing build errors or webpack configurations.
  - Because we don't need polyfills, the size of this library is tiny.
