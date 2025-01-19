import { AuthorizedUser as User } from "./user.interface";
import { Word } from "./word.interface";

export interface Deck {
  id: number;
  name: string;
  description: string;
  createdBy: User;
  words: Word[];
}
