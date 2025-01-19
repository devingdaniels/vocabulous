import axios from "axios";
import { getBackendURL } from "@/utils/index";
import { IWord } from "@/interfaces/word.interface";

const createWord = async (words: string[], deckId: number) => {
  try {
    const URL = getBackendURL(`deck/${deckId}/word`);
    console.log(URL);
    const response = await axios.post(URL, { words });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || "An error occurred on the server.");
    } else {
      throw new Error("Error creating word. Please try again.");
    }
  }
};

const getWords = async (deckId: number) => {
  try {
    const URL = getBackendURL(`deck/${deckId}/word`);
    const response = await axios.get(URL);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || "An error occurred on the server.");
    } else {
      throw new Error("Error fetching words. Please try again.");
    }
  }
};

const getWordByID = async (deckId: string) => {
  const URL = getBackendURL(`word/${deckId}/word`);
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response.data);
  }
};

const updateWordById = async (word: IWord) => {
  try {
    const URL = getBackendURL(`word/${word.id}`);
    const response = await axios.put(URL, { word });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || "An error occurred on the server.");
    } else {
      throw new Error("Error updating word. Please try again.");
    }
  }
};

const deleteWordById = async (word: IWord) => {
  try {
    const URL = getBackendURL(`word/${word.id}`);
    const response = await axios.delete(URL);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || "An error occurred on the server.");
    } else {
      throw new Error("Error updating word. Please try again.");
    }
  }
};

export const WordDispatch = {
  createWord,
  getWords,
  getWordByID,
  updateWordById,
  deleteWordById,
};
