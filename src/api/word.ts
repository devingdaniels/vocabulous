import axios from "axios";
import { getBackendURL } from "@/constants";

export const createWord = async (deckID: string, userID: string, words: string[]) => {
  try {
    const URL = getBackendURL(`deck/${deckID}/word`);
    console.log(URL);
    const response = await axios.post(URL, { words, userID });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || "An error occurred on the server.");
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};
