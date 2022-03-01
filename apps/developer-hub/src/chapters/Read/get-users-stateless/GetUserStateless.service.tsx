import axios from "axios";
import { BASE_URI } from "../../ChapterHelper/BaseUri";
import { CoinEntry, DAOCoinEntry } from "../../Interfaces/Coin.interface";

export const getUserStateless = async (
  PublicKeysBase58Check: string
): Promise<{
  request: UserInfoRequest;
  endpoint: string;
  response: UserInfoResponse;
}> => {
  const endpoint = "get-users-stateless";
  const request: UserInfoRequest = {
    PublicKeysBase58Check: [PublicKeysBase58Check],
    SkipForLeaderboard: false,
  };

  if (endpoint) {
    const response = (await axios.post(`${BASE_URI}/${endpoint}`, request))
      .data;
    return { response, endpoint, request };
  } else {
    throw new Error("need to add endpoint value");
  }
};

export interface UserInfoRequest {
  PublicKeysBase58Check: string[];
  SkipForLeaderboard: boolean;
}
export interface UserInfoResponse {
  UserList: {
    PublicKeyBase58Check: string;
    ProfileEntryResponse: {
      PublicKeyBase58Check: string;
      Username: string;
      Description: string;
      IsHidden: boolean;
      IsReserved: boolean;
      IsVerified: boolean;
      Comments?: any;
      Posts?: any;
      CoinEntry: CoinEntry;
      DAOCoinEntry: DAOCoinEntry;
      CoinPriceDeSoNanos: number;
      CoinPriceBitCloutNanos: number;
      UsersThatHODL?: any;
      IsFeaturedTutorialWellKnownCreator: boolean;
      IsFeaturedTutorialUpAndComingCreator: boolean;
    };
    Utxos?: any;
    BalanceNanos: number;
    UnminedBalanceNanos: number;
    PublicKeysBase58CheckFollowedByUser?: string[];
    UsersYouHODL?: any;
    UsersWhoHODLYouCount: number;
    HasPhoneNumber: boolean;
    CanCreateProfile: boolean;
    BlockedPubKeys?: any;
    HasEmail: boolean;
    EmailVerified: boolean;
    JumioStartTime: number;
    JumioFinishedTime: number;
    JumioVerified: boolean;
    JumioReturned: boolean;
    IsAdmin: boolean;
    IsSuperAdmin: boolean;
    IsBlacklisted: boolean;
    IsGraylisted: boolean;
    TutorialStatus: string;
    CreatorCoinsPurchasedInTutorial: number;
    MustCompleteTutorial: boolean;
  }[];
  DefaultFeeRateNanosPerKB: number;
  ParamUpdaters: {
    [key: string]: boolean;
  };
}
