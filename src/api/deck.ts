import { getBackendURL } from "@/utils/index";
import { Axios } from "./axios";
import { getUserFromLocalStorage } from "@/utils";

const getDecks = async () => {
  const URL = getBackendURL("deck");
  try {
    const response = await Axios.get(URL);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response.data);
  }
};

const getDeckByID = async (id: string) => {
  try {
    const response = await Axios.get(`${URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response.data);
  }
};

export const createDeck = async (name: string) => {
  //const { user, token } = getUserFromLocalStorage();
  // const user_id = user;
  try {
    const response = await Axios.post(`${URL}/`, { name });
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response.data);
  }
};

const updateDeck = async (name: string, deckId: number) => {
  const { user, token } = getUserFromLocalStorage();
  try {
    const response = await Axios.put(`${URL}/${deckId}`, { name, user, token });
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response.data);
  }
};

export const DeckDispatch = {
  getDecks,
  getDeckByID,
  createDeck,
  updateDeck,
};
