export type AuthorizedUser = {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
};

export type User = AuthorizedUser & {};
