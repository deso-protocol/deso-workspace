export interface GetDecryptMessagesResponse {
  EncryptedHex: string;
  PublicKey: string;
  IsSender: boolean;
  Legacy: boolean;
  Version: number;
  SenderMessagingPublicKey: string;
  SenderMessagingGroupKeyName: string;
  RecipientMessagingPublicKey: string;
  RecipientMessagingGroupKeyName: string;
  decryptedMessage: string;
}

export interface GetApproveResponse {
  id?: string;
  service: string;
  method: 'approve';
  payload: {
    users: {
      [key: string]: {
        accessLevel: number;
        accessLevelHmac: string;
        btcDepositAddress: string;
        encryptedSeedHex: string;
        hasExtraText: boolean;
        network: string;
      };
    };
    signedTransactionHex: string;
  };
}
