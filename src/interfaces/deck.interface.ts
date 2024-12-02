import { AuthorizedUser as User } from "./user.interface";

export interface Deck {
  id: number;
  name: string;
  description: string;
  createdBy: User;
  words: Word[];
}
