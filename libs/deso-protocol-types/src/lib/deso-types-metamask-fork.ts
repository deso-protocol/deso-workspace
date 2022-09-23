export enum MessagingGroupOperation {
  DEFAULT_KEY = 'DefaultKey',
  CREATE_GROUP = 'CreateGroup',
  ADD_MEMBERS = 'AddMembers',
}

export type IdentityMessagingResponse = {
  encryptedToApplicationGroupMessagingPrivateKey: string;
  encryptedToMembersGroupMessagingPrivateKey: string[];
  messagingKeySignature: string;
  messagingPublicKeyBase58Check: string;
};
