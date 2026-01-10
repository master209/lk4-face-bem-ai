import {FormErrors} from './common';

export type LoginData = { // sign-in - авторизация юзера
  login?: string; // ...или через логин
  phone?: string; // ...или через телефон
  password: string;
};

export type LoginAddData = { // это приходит с сервера и дополняет данные авторизации
  username: string;
  token?: string;
  isPhoneNotConfirmed?: boolean;
  serverErrors?: FormErrors;
} & LoginData;

export type RegaData = { // sign-up - регистрация
  firstname: string; // имя
  lastname: string; // фамилия
  phone: string; // регистрируется только юзер через телефон
  password: string;
  passwordRepeat: string;
  confirm: boolean;
  smsCode?: string; // поле для ввода кода подтверждения телефона
};

export type AuthData = RegaData;

export type RegaResponse = {
  phone: string;
  phoneConfirmToken: string;
  smsConfirmationLifetime: number;
  smsConfirmationRepeat: number;
  notConfirmedUserLifetime: number; // через сколько суток удаляется неподтвержденная регистрация
  serverErrors?: FormErrors;
};

export type ResetPasswordData = { // сброс пароля
  phoneConfirmToken: string;
  password: string;
};

export type RequestResetPasswordData = { // запрос сброса пароля
  phone: string;
};

export type ResetPasswordResponse = {
  isResetPassword: boolean;
} | FormErrors;

export type RequestResetPasswordResponse = {
  phone: string;
  phoneConfirmToken: string;
  smsConfirmationLifetime: number;
  smsConfirmationRepeat: number;
  serverErrors?: FormErrors;
};

export type ResetPasswordConfirmPhoneResponse = {
  isResetPasswordConfirmPhone: boolean;
} | FormErrors;

export type UserData = {
  token: string;
  username: string; // авторизовавшийся юзер хранится в базе и в localStorage как username
  shortname: string;
  isOfertaUser?: boolean;
};

export type ConfirmPhoneData = {
  phoneConfirmToken: string;
  smsCode: string;
};

export type ConfirmPhoneResponse = {
  isRegistrationOk: boolean;
} | FormErrors;

export type SmsRepeatData = {
  phoneConfirmToken: string;
};

export type SmsRepeatResponse = {
  phone: string;
} | FormErrors;

export type FetchUserData = LoginAddData | FormErrors;

export type Balance = {
  sum: number;
  time: string;
};
