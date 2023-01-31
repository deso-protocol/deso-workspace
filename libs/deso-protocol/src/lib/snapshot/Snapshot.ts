import axios from 'axios';
import {
  GetSnapshotEpochMetadataResponse,
  GetStateChecksumResponse,
} from 'deso-protocol-types';
import { Node } from '../Node/Node';

export class Snapshot {
  private node: Node;
  constructor(node: Node) {
    this.node = node;
  }

  public async GetSnapshotEpochMetadata(): Promise<GetSnapshotEpochMetadataResponse> {
    return (await axios.get(`${this.node.getUri()}/snapshot-epoch-metadata`))
      .data;
  }

  public async GetStateChecksum(): Promise<GetStateChecksumResponse> {
    return (await axios.get(`${this.node.getUri()}/state-checksum`)).data;
  }
}
