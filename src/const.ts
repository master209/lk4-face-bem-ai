export const BASE_URL = 'https://lk.gals-telecom.ru';
export const TITLE_FREFIX = 'ЛК “Галс-Телеком” - ';
export const IMG_PATH = '/img/';
export const DOC_PATH = '/doc/';
export const PASSW_MIN = 8;
export const PASSW_MAX = 20;
export const PASSW_REGEXP =  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]+$/;
export const PHONE_LEN = 10; // длина телефонного номера без +7
export const SMS_CODE_LEN = 5; // длина СМС-кода подтверждения

export const ROUTE_MENU_POSITION = 1; // позиция элемента-меню в URL вида - quick-start/Введение
export const ROUTE_SUBMENU_POSITION = 2; // позиция элемента подменю

export enum NameSpace {
  Main = 'MAIN',
}

// это роуты, которые видит юзер (в URL)
export enum AppRoute {
  Main = '/',

  Added = '/about/about/added',
  Contacts = '/about/about/contacts',
}

export const FormError = {
  Required: 'Поле обязательно для заполнения',
  PasswordTooShort: 'Пароль слишком короткий',
  PasswordTooLong: 'Пароль слишком длинный',
  PasswordTooSimple: 'Пароль слишком простой',

  PhoneIncorrect: 'Телефон указан некорректно',
  PhoneTooShort: 'Телефон слишком короткий',
};

export enum Color {
  Normal = 'Normal',
  Warning = 'Warning',
  Cancel = 'Cancel',
}
