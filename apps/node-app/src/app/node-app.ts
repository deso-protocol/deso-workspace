import Deso from 'deso-protocol';
export function nodeApp(): string {
  const deso = new Deso();
  deso.identity.login();
  return 'node-app';
}
