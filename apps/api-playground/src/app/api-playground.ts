import Deso from 'deso-protocol';
type TODO = any;

export async function apiPlayground(): Promise<TODO> {
  const deso = new Deso({ identityConfig: { host: 'server' } });
  console.log('hello');

  return 'api-playground';
}
