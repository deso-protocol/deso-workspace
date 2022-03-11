import { BASE_URI } from '../state/BaseUri';

export class Node {
  public getUri(): string {
    return localStorage.getItem('node_uri') || BASE_URI;
  }
  public setUri(uri: string): void {
    localStorage.setItem('node_uri', uri);
  }
  constructor() {
    this.setUri(BASE_URI);
  }
}
