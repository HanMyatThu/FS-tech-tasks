interface CustomUserInterface {
  username: string,
  email: string,
  imageUrl?: string,
  tokens: [
    {
      token?: string
    }
  ]
}

export interface AuthInterface {
  user: CustomUserInterface;
  accessToken: string;
}