import { Axios } from "./axios";
import { getBackendURL } from "@/utils/index";

const updateWordStats = async (wordID: string[], stats: object) => {
  try {
    const URL = getBackendURL(`deck/${wordID}/word`);
    const response = await Axios.post(URL, { stats });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || "An error occurred on the server.");
    } else {
      throw new Error("Error creating word. Please try again.");
    }
  }
};

export const WordDispatch = {
  updateWordStats,
};
