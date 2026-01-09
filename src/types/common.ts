import { AxiosInstance } from 'axios';
import {store} from '../store';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type FormErrors = {[field: string]: string} | null;

export type RequestProps = {
  api: AxiosInstance;
  req: string;
  // eslint-disable-next-line
  payload?: any;
}

export type Toast = {
  type: string;
  text: string;
}
