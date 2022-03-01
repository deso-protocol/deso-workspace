import { CoinEntry, DAOCoinEntry } from "../../Interfaces/Coin.interface";
import axios from "axios";
import { BASE_URI } from "../../ChapterHelper/BaseUri";
export const getSingleProfile = async (
  PublicKeyBase58Check: string
): Promise<{
  response: ProfileInfoResponse;
  endpoint: string;
  request: ProfileInfoRequest;
}> => {
  const endpoint = "get-single-profile";
  const request: ProfileInfoRequest = {
    PublicKeyBase58Check,
  };
  if (endpoint) {
    const response = (await axios.post(`${BASE_URI}/${endpoint}`, request))
      .data;
    return { response, endpoint, request };
  } else {
    throw new Error("need to add endpoint value");
  }
};

export interface ProfileInfoRequest {
  Username?: string;
  PublicKeyBase58Check?: string;
  GetEntriesFollowingUsername?: boolean;
  LastPublicKeyBase58Check?: string;
  NumToFetch?: number;
}

export interface ProfileInfoResponse {
  Profile: {
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
  IsBlacklisted: boolean;
  IsGraylisted: boolean;
}
