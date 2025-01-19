import { AuthorizedUser as User } from "./user.interface";
import { IWord } from "./word.interface";

export interface Deck {
  id: number;
  name: string;
  description: string;
  createdBy: User;
  words: IWord[];
}
