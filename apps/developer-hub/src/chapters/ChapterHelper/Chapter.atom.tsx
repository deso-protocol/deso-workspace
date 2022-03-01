import { atom } from "recoil";
import { User } from "../Interfaces/User";
import { recoilPersist } from "recoil-persist";
import { DEZO_DOG } from "../../services/utils";
const { persistAtom } = recoilPersist();
export const PublicKey = atom<string>({
  key: "publicKey",
  // deso dog in the scenario they dont have an account
  default: DEZO_DOG,
  effects_UNSTABLE: [persistAtom],
});

export const LoggedInUser = atom<User | null>({
  key: "user",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
