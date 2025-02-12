import { RegisterOptions } from 'react-hook-form';
import { josa } from 'es-hangul';

export type Field =
  | 'name'
  | 'email'
  | 'nickname'
  | 'password'
  | 'passwordConfirmation'
  | 'birthVerify';

const FIELD_DICTIONARY: Record<Field, string> = {
  name: '이름',
  email: '이메일',
  nickname: '닉네임',
  password: '비밀번호',
  passwordConfirmation: '비밀번호 확인',
  birthVerify: '본인인증',
};

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_PATTERN = /^[A-Za-z\d!@#$%^&*]+$/;
const MAX_NICKNAME_LENGTH = 20;
const MIN_PASSWORD_LENGTH = 8;
const MIN_NAME_LENGTH = 2;

const generateRequiredMessage = (name: Field): string => {
  if (name === 'passwordConfirmation') return `비밀번호를 다시 한번 입력해 주세요.`;

  return `${josa(FIELD_DICTIONARY[name], '을/를')} 입력해 주세요.`;
};

const NAME_RULES: RegisterOptions = {
  required: generateRequiredMessage('name'),
  minLength: {
    value: MIN_NAME_LENGTH,
    message: `이름은 최소 ${MIN_NAME_LENGTH}글자 이상 입력해 주세요.`,
  },
};

const EMAIL_RULES: RegisterOptions = {
  required: generateRequiredMessage('email'),
  pattern: {
    value: EMAIL_PATTERN,
    message: '이메일 형식으로 작성해 주세요.',
  },
};

const NICKNAME_RULES: RegisterOptions = {
  required: generateRequiredMessage('nickname'),
  maxLength: {
    value: MAX_NICKNAME_LENGTH,
    message: `닉네임은 최대 ${MAX_NICKNAME_LENGTH}자까지 가능합니다.`,
  },
};

const PASSWORD_RULES: RegisterOptions = {
  required: generateRequiredMessage('password'),
  minLength: {
    value: MIN_PASSWORD_LENGTH,
    message: `비밀번호는 최소 ${MIN_PASSWORD_LENGTH}자 입니다.`,
  },
  pattern: {
    value: PASSWORD_PATTERN,
    message: '비밀번호는 숫자, 영문, 특수문자(!@#$%^&*)포함해야 합니다.',
  },
};

export const PASSWORD_CONFIRM_RULES = (passwordValue: string): RegisterOptions => ({
  required: generateRequiredMessage('passwordConfirmation'),
  validate: (value) => value === passwordValue || '비밀번호가 일치하지 않습니다.',
});

const BIRTH_VERIFY_PATTERN = /^(19|20)\d{2}\.(0[1-9]|1[0-2])\.(0[1-9]|[12][0-9]|3[01])$/;

const BIRTH_VERIFY_RULES: RegisterOptions = {
  required: generateRequiredMessage('birthVerify'),
  pattern: {
    value: BIRTH_VERIFY_PATTERN,
    message: 'yyyy.mm.dd 형식으로 작성해 주세요.',
  },
};

const VALIDATION_RULES: Record<Field, RegisterOptions> = {
  name: NAME_RULES,
  email: EMAIL_RULES,
  nickname: NICKNAME_RULES,
  password: PASSWORD_RULES,
  passwordConfirmation: {},
  birthVerify: BIRTH_VERIFY_RULES,
};

export default VALIDATION_RULES;
