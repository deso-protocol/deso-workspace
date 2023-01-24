# @deso-core/identity

Why a new library? This library is intended to solve many of the issues we have
with the existing
[deso-protocol](https://github.com/deso-protocol/deso-workspace/tree/master/libs/deso-protocol)
library:

- `deso-protocol` manages signing by accessing a user's master key pair via the
  identity [iframe API](https://docs.deso.org/for-developers/identity/iframe-api/basics). This requires users to enable access to third party cookies
  and local storage on many browsers (Brave, Safari on IOS, Chrome in incognito
  mode, etc).
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
