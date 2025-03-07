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
