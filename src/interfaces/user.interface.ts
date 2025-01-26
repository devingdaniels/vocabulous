export type AuthorizedUser = {
  user_id: number;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
};

export type User = AuthorizedUser & {};
