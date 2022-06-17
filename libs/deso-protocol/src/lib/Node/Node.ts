import { BASE_URI } from '../state/BaseUri';

export class Node {
  private nodeURI = '';

  public getUri(): string {
    return this.nodeURI || BASE_URI;
  }

  public setUri(uri: string): void {
    this.nodeURI = uri;
  }

  constructor(uri?: string) {
    this.setUri(uri ?? BASE_URI);
  }
}
