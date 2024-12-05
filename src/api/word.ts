import axios from "axios";

const URL =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_PROD;

export const createWord = async (deckID: string, userID: string, word: string[]) => {
  try {
    const response = await axios.post(`${URL}/deck/${deckID}/word`, { word, userID });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};
