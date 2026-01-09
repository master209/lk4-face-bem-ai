import {StatusCodes} from 'http-status-codes';
import { toast } from 'react-toastify';
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError
} from 'axios';

const {BAD_REQUEST, NOT_FOUND} = StatusCodes;
const shouldDisplayError = (response: AxiosResponse) => [BAD_REQUEST, NOT_FOUND].includes(response.status);

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

  api.interceptors.response.use(
    (response) => {
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

  return api;
};
