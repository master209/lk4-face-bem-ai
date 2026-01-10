import { createSlice } from '@reduxjs/toolkit';
import { USER_INACTIVITY_MAX_TIMEOUT } from '../../const';

import {
  fetchCheckAuth,
  fetchLogin,
  fetchRega,
  fetchLogout,
  fetchConfirmPhone,
  fetchSmsRepeat,
  fetchResetPassword,
  fetchRequestResetPassword,
  fetchRequestResetPasswordConfirmPhone,
  fetchResetPasswordSmsRepeat,
  fetchUserBalance,
} from '../api-actions';
import { FormErrors } from '../../types/common';
import { RegaResponse, LoginAddData, SmsRepeatResponse, RequestResetPasswordResponse, Balance } from '../../types/user-data';
import { NameSpace, AuthorizationStatus } from '../../const';

const {Auth, NoAuth, Unknown} = AuthorizationStatus;

const initRegaResponse = {
  phone: '',
  phoneConfirmToken: '',
  smsConfirmationLifetime: 0,
  smsConfirmationRepeat: 0,
  notConfirmedUserLifetime: 0,
};

export type UserProcess = {
  isCheckingAuth: boolean; // этот флаг установлен в true пока от сервера не получен ответ, есть ли у юзера доступ к странице
  authorizationStatus: AuthorizationStatus;
  username: string;
  shortname: string;
  balance: Balance;
  isOfertaUser?: boolean; // зарегистрировался сам?
  serverErrors: FormErrors;
  regaResponse: RegaResponse;
  smsRepeatResponse?: SmsRepeatResponse;
  requestResetPasswordResponse: RequestResetPasswordResponse;
  isRegistrationOk: boolean; // если 'истина' - регистрация уже успешно завершена
  isResetPassword?: boolean;
  isResetPasswordConfirmPhone?: boolean; // если 'истина' - телефон подтвержден, можно менять забытый пароль
  isPhoneNotConfirmed?: boolean;
  userInactivityMaxTimeout: number;
};

const initialState: UserProcess = {
  isCheckingAuth: true, // изначально для юзера закрыт доступ к странице т.к ответ от сервера еще не получен
  authorizationStatus: Unknown,
  username: '',
  shortname: '',
  balance: {
    sum:0,
    time: '',
  },
  isOfertaUser: undefined,
  serverErrors: {},
  regaResponse: initRegaResponse,
  requestResetPasswordResponse: initRegaResponse,
  isRegistrationOk: false,
  userInactivityMaxTimeout: USER_INACTIVITY_MAX_TIMEOUT,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    // очистка от всех ошибок, пришедших с сервера
    /* eslint-disable */
    clearServerErrors: (state, {payload}) => {
      state.serverErrors = state.serverErrors && Object.keys(state.serverErrors)
        .reduce((acc: any, next: any) => ({...acc, [next]: ''}), {});
    /* eslint-enable */
    },
    resetState: (state) => ({
      ...state,
      serverErrors: {},
      regaResponse: initRegaResponse,
      isRegistrationOk: false,
      isPhoneNotConfirmed: false,
    }),
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCheckAuth.pending, (state) => ( // ожидание ответа от сервера есть ли у юзера доступ к странице
        { ...state, isCheckingAuth:true } // пока для юзера закрыт доступ к странице т.к ответ от сервера еще не получен
      ))
      .addCase(fetchCheckAuth.fulfilled, (state, {payload: {username, shortname, isOfertaUser}}) => { // получен ответ от сервера
        state.isCheckingAuth = false; // для юзера получен ответ от сервера о досупности страницы
        state.authorizationStatus = username ? Auth : NoAuth;
        state.username = username;
        state.shortname = shortname;
        state.isOfertaUser = isOfertaUser;
      })
      .addCase(fetchCheckAuth.rejected, (state) => {
        state.isCheckingAuth = false;
        state.authorizationStatus = NoAuth;
        state.username = '';
        state.shortname = '';
        state.isOfertaUser = undefined;
      })
      .addCase(fetchLogin.fulfilled, (state, {payload}) => { // авторизация
        const _state = {...state, ...payload};
        const {username} = payload as LoginAddData;

        if(!payload?.serverErrors) {
          _state.authorizationStatus = Auth;
          _state.username = username;
        }

        // обнуление ошибок сервера
        const serverErrors = payload?.isPhoneNotConfirmed ? {} : payload?.serverErrors;
        _state.serverErrors = serverErrors as FormErrors;

        return {...state, ..._state};
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.isCheckingAuth = false;
        state.authorizationStatus = NoAuth;
        state.username = '';
        state.shortname = '';
        state.isOfertaUser = undefined;
      })
      .addCase(fetchRega.fulfilled, (state, {payload}) => ( // регистрация
        {...state, ...payload}
      ))
      .addCase(fetchConfirmPhone.fulfilled, (state, {payload}) => ( // подтверждение телефонного номера
        {...state, ...payload}
      ))
      .addCase(fetchSmsRepeat.fulfilled, (state, {payload}) => ( // повторный запрос СМС для подтверждения тел
        {...state, ...payload}
      ))

      .addCase(fetchResetPassword.fulfilled, (state, {payload}) => ( // сброс пароля
        {...state, ...payload}
      ))
      .addCase(fetchRequestResetPassword.fulfilled, (state, {payload}) => ( // запрос сброса пароля
        {...state, ...payload}
      ))
      .addCase(fetchRequestResetPasswordConfirmPhone.fulfilled, (state, {payload}) => ( // подтверждение тел при запросе сброса пароля
        {...state, ...payload}
      ))
      .addCase(fetchResetPasswordSmsRepeat.fulfilled, (state, {payload}) => ( // повторный запрос СМС при восстановлении пароля
        {...state, ...payload}
      ))

      .addCase(fetchUserBalance.fulfilled, (state, {payload}) => (
        {...state, ...payload}
      ))

      .addCase(fetchLogout.fulfilled, (state) => { // выход
        state.isCheckingAuth = false;
        state.authorizationStatus = NoAuth;
        state.username = '';
        state.shortname = '';
        state.isOfertaUser = undefined;
      });
  }
});

export const { clearServerErrors, resetState } = userProcess.actions;
