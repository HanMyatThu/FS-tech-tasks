export interface IUser {
  _id: string;
  username: string;
  email: string;
  imageUrl?: string;
  tokens: [
    {
      token?: string,
    }
  ];
}