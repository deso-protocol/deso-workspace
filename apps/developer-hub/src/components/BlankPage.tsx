import { identity } from '@deso-core/identity';

identity.configure({ identityURI: 'http://localhost:4201' });

const login = () =>
  identity.loginWithRedirect({
    redirectURI: `${window.location.origin}/devtest`,
  });

export function BlankPage() {
  return (
    <div>
      <h1>Blank Page</h1>
      <button onClick={login}>Login</button>
    </div>
  );
}
