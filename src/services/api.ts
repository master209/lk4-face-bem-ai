import {StatusCodes} from 'http-status-codes';
import { toast } from 'react-toastify';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios';

import { UserProcess } from '../store/user-process';
import { store } from '../store';
import { getToken, dropToken } from './token';
import { getLogoutTime, saveLogoutTime, dropLogoutTime } from './userActivity';
import { AuthorizationStatus } from '../const';
import { nowUNIXtime, userInactivityLogoutTime } from '../helpers';

const {BAD_REQUEST, UNAUTHORIZED, NOT_FOUND} = StatusCodes;
const shouldDisplayError = (response: AxiosResponse) => [BAD_REQUEST, UNAUTHORIZED, NOT_FOUND].includes(response.status);

export const BACKEND_URL = 'https://api.lk.gals-telecom.ru';
//export const BACKEND_URL = 'http://api.lk4-devel.gals-telecom.ru';
const REQUEST_TIMEOUT = 5000;

interface BackendError {
  error: string;
}

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token && config.headers) {
		config.headers['Authorization'] = `Bearer ${token}`;
		config.headers['Content-Type'] = 'application/json;charset=utf-8';
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => {
      if(response.data.name === 'Unauthorized+') {
        toast.error('Необходима повторная авторизация');
      } else {
        const user = store.getState().USER;
        if(!getLogoutTime()) { // если в localStorage не содержится время принудительно логаута по превышению порога бездействия
          calcAndSaveLogoutTime(user);
        } else {
          handleLogout(user);
        }

        return response;
      }
    },
    (error: AxiosError<BackendError>) => {
      if (error.response) {
        // eslint-disable-next-line no-console
        console.log('interceptors error.response: ', error.response);
        shouldDisplayError(error.response) && toast.error(error.response.data.error);

        throw error;
      } else { // Network error
        toast.error('Ошибка сервера. Попробуйте перегрузить страницу.');
      }
    }
  );

  // логика принудительного логаута
  const handleLogout = (user: UserProcess) => {
    const logoutTime = getLogoutTime();
    // eslint-disable-next-line no-console
    // console.log('now, userInactivityMaxTimeout: ', nowUNIXtime(), user.userInactivityMaxTimeout, logoutTime);

    if(logoutTime) {
      if(nowUNIXtime() > logoutTime) { // принудительный логаут по превышению порога бездействия
        dropLogoutTime();
        dropToken();
        window.location.reload();
      } else
      if(nowUNIXtime() <= logoutTime) { // пересчет времени принудительного логаута, т.к. порог бездействия не превышен
        calcAndSaveLogoutTime(user);
      }
    }
  };

  // вычисляется время принудительно логаута по превышению порога бездействия и сохраняется в localStorage
  const calcAndSaveLogoutTime = (user: UserProcess) => {
    if(user.authorizationStatus === AuthorizationStatus.Auth) { // только для авторизовавшегося юзера
      const logoutTime = userInactivityLogoutTime(user.userInactivityMaxTimeout);
      saveLogoutTime(logoutTime);
    }
  };

  return api;
};
