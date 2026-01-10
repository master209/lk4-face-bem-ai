import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { State, AppDispatch } from '../types/common';
import {
  RegaData,
  RegaResponse,
  ResetPasswordData,
  RequestResetPasswordData,
  ResetPasswordResponse,
  RequestResetPasswordResponse,
  ResetPasswordConfirmPhoneResponse,
  LoginData,
  UserData,
  LoginAddData,
  FetchUserData,
  ConfirmPhoneResponse,
  ConfirmPhoneData,
  SmsRepeatData,
  SmsRepeatResponse,
  Balance,
} from '../types/user-data';
import { saveToken, dropToken } from '../services/token';
import { dropLogoutTime } from '../services/userActivity';
import { APIRoute } from '../const';

export const fetchCheckAuth = createAsyncThunk<UserData, string, { // UserData - С сервера; string - НА сервер (токен)
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'User/fetchCheckAuth',
  async (token, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.CheckAuth, {token});
    return {...data};
  },
);

export const fetchLogin = createAsyncThunk<FetchUserData, LoginData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'User/fetchLogin',
  async ({login, phone, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<LoginAddData>(APIRoute.Login, {login, phone, password});
    dropLogoutTime();
    if(data.token) {
      saveToken(data.token);
      return {...data, login, phone};
    } else {
      dropToken();
      return {...data};
    }
  },
);

export const fetchRega = createAsyncThunk<RegaResponse, RegaData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'User/fetchRega',
  async (regaData, {dispatch, extra: api}) => {
    const {data} = await api.post<RegaResponse>(APIRoute.Rega, {...regaData});
    return {...data};
  },
);

export const fetchConfirmPhone = createAsyncThunk<ConfirmPhoneResponse, ConfirmPhoneData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'User/fetchConfirmPhone',
  async (confirmPhoneData, {dispatch, extra: api}) => {
    const {data} = await api.post<ConfirmPhoneResponse>(APIRoute.ConfirmPhone, {...confirmPhoneData});
    return {...data};
  },
);

export const fetchSmsRepeat = createAsyncThunk<SmsRepeatResponse, SmsRepeatData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'User/fetchSmsRepeat',
  async (smsRepeatData, {dispatch, extra: api}) => {
    const {data} = await api.post<SmsRepeatResponse>(APIRoute.ConfirmSmsRepeat, {...smsRepeatData});
    return {...data};
  },
);

export const fetchLogout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('User/fetchLogout', () => {
  dropToken();
  dropLogoutTime();
});

export const fetchUserBalance = createAsyncThunk<Balance, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'User/fetchUserBalance',
  async (undefined, {dispatch, extra: api}) => {
    const {data} = await api.get<Balance>(APIRoute.UserBalance);
    return {...data};
  }
);

export const fetchRequestResetPassword = createAsyncThunk<RequestResetPasswordResponse, RequestResetPasswordData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'User/fetchRequestResetPassword',
  async (requestResetPasswordData, {dispatch, extra: api}) => {
    const {data} = await api.post<RequestResetPasswordResponse>(APIRoute.RequestResetPassword, {...requestResetPasswordData});
    return {...data};
  },
);

export const fetchRequestResetPasswordConfirmPhone = createAsyncThunk<ResetPasswordConfirmPhoneResponse, ConfirmPhoneData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'User/fetchRequestResetPasswordConfirmPhone',
  async (confirmPhoneData, {dispatch, extra: api}) => {
    const {data} = await api.post<ResetPasswordConfirmPhoneResponse>(APIRoute.ResetPasswordConfirmPhone, {...confirmPhoneData});
    return {...data};
  },
);

export const fetchResetPasswordSmsRepeat = createAsyncThunk<SmsRepeatResponse, SmsRepeatData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'User/fetchResetPasswordSmsRepeat',
  async (smsRepeatData, {dispatch, extra: api}) => {
    const {data} = await api.post<SmsRepeatResponse>(APIRoute.ResetPasswordConfirmSmsRepeat, {...smsRepeatData});
    return {...data};
  },
);

export const fetchResetPassword = createAsyncThunk<ResetPasswordResponse, ResetPasswordData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'User/fetchResetPassword',
  async (resetPasswordData, {dispatch, extra: api}) => {
    const {data} = await api.post<ResetPasswordResponse>(APIRoute.ResetPassword, {...resetPasswordData});
    return {...data};
  },
);
