import axios from "axios";
import { BASE_URI } from "../../ChapterHelper/BaseUri";

export const getAppState = async () => {
  return (await axios.post(`${BASE_URI}/get-app-state`, {})).data;
};
