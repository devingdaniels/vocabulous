import { getBackendURL } from "@/utils/index";
import axios from "axios";
import { getUserFromLocalStorage } from "@/utils";

const getDecks = async () => {
  const URL = getBackendURL("deck");
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response.data);
  }
};

const getDeckByID = async (id: string) => {
  try {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response.data);
  }
};

const createDeck = async (name: string) => {
  const { user, token } = getUserFromLocalStorage();
  try {
    const response = await axios.post(`${URL}/`, { name, user, token });
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response.data);
  }
};

const updateDeck = async (name: string, deckId: number) => {
  const { user, token } = getUserFromLocalStorage();
  try {
    const response = await axios.put(`${URL}/${deckId}`, { name, user, token });
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
