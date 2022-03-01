import { Users } from "./User";

export interface DesoIdentityResponse {
  id: string;
  service: string;
  method: string;
  payload: any;
}
export interface DesoIdentityLoginResponse extends DesoIdentityResponse {
  payload: LoginInformationPayload;
}
export interface DesoIdentitySumbitTransactionResponse
  extends DesoIdentityResponse {
  payload: SubmitTransactionPayload;
}
export interface DesoIdentityDecryptedHexesactionResponse
  extends DesoIdentityResponse {
  payload: DecryptedHexesPayload;
}

export interface DesoIdentityEncryptedResponse extends DesoIdentityResponse {
  payload: EncryptedMessagePayload;
}

export interface LoginInformationPayload {
  users: Users;
  publicKeyAdded: string;
  signedUp: boolean;
}
export interface SubmitTransactionPayload {
  signedTransactionHex: string;
}
export interface DecryptedHexesPayload {
  decryptedHexes: { [hex: string]: string };
}
export interface EncryptedMessagePayload {
  encryptedMessage: string;
}
