import { BASE_URI } from '../state/BaseUri';

export class Node {
  public getUri(): string {
    return localStorage.getItem('node_uri') || BASE_URI;
  }
  public setUri(uri: string): void {
    localStorage.setItem('node_uri', uri);
  }
  constructor(uri?: string) {
    console.log(uri ?? BASE_URI);
    this.setUri(uri ?? BASE_URI);
  }
}
