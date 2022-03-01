import axios from "axios";
import { getSignerInfo, uuid } from "../../../services/utils";
import { BASE_URI } from "../../ChapterHelper/BaseUri";
import { identitySignTransaction } from "../../Identity/sign-transaction/IdentitySubmitTransaction.service";
import { User } from "../../Interfaces/User";
export interface CreateFollowTxnStatelessRequest {
  FollowerPublicKeyBase58Check: string;
  FollowedPublicKeyBase58Check: string;
  IsUnfollow: boolean;
  MinFeeRateNanosPerKB?: number;
}
export const CreateFollowTxnStateless = async (
  request: CreateFollowTxnStatelessRequest,
  user: User
) => {
  if (!request.FollowerPublicKeyBase58Check) {
    throw Error("FollowerPublicKeyBase58Check is undefined");
  }
  if (!request.FollowedPublicKeyBase58Check) {
    throw Error("FollowedPublicKeyBase58Check is undefined");
  }
  if ((request.IsUnfollow as any) instanceof Boolean) {
    throw Error("IsUnfollow is undefined");
  }
  request = { ...{ MinFeeRateNanosPerKB: 1000 }, ...request };
  const response = (
    await axios.post(`${BASE_URI}/create-follow-txn-stateless`, request)
  ).data;
  const payload = getSignerInfo(user, response);
  const requestToBeSigned = {
    id: uuid(),
    method: "sign",
    payload,
    service: "identity",
  };
  await identitySignTransaction(requestToBeSigned, user).catch((e) => {
    throw Error("something went wrong with submitting the transaction");
  });
};
