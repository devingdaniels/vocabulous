import axios from "axios";

const URL =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_PROD;

export const createDeck = async (name: string, userID: string) => {
  try {
    const response = await axios.post(`${URL}/deck`, { name, userID });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getDecks = async () => {
  try {
    const response = await axios.get(`${URL}/deck`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getDeckByID = async (id: string) => {
  try {
    const response = await axios.get(`${URL}/deck/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};
