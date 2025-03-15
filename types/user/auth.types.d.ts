interface SignUpRequestData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
  birth: string;
}

interface SignInRequestData {
  username: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  nickname: string;
  description: string | null;
  imageUrl: string;
}
