# @deso-core/data

Simple, zero dependency api wrapper for deso backend api endpoints. Provides
param and response types to provide editor assistance when making deso backend
requests.

NOTE: You should _only_ use this if you need to issue read-only api requests to the
deso backend and do not require an authenticated user. If you also need login/logout
or other deso identity support you should use the `deso-protocol@beta` package.

### Install

```sh
npm install @deso-core/data
```

### Configuration

```ts
import { api } from '@deso-core/data';

api.configure({
  // Sets the hostname for the node that will be used
  // for all subsequent requests. If not passed it will
  // default to https://node.deso.org
  nodeURI: 'https://myawesomenode.com',
});
```

### Usage

```ts
import { getPostsStateless, getSinglePost } from '@deso-core/data';

// get 20 posts
const posts = await getPostsStateless({ NumToFetch: 20 });

// get a single post
const post = await getSinglePost({ PostHashHex: posts[0] });
```
