import { Reducer, ReducerState, Dispatch } from 'react';

export type State = {
  loading: boolean;
  amountMin: string;
  amountMax: string;
  pay: Pay; // данные с формы для проведения платежа
  paySuccess?: string; // результат проверки успеха оплаты
}

// Все возможные варианты действий со стейтом
export enum ActionType {
  LOADING = 'LOADING',
  PAY_FORM_INIT = 'PAY_FORM_INIT',
  SEND_PAY_DATA = 'SEND_PAY_DATA', // отправка платежа
  CHECK_PAY_RESULT_SUCCESS = 'CHECK_PAY_RESULT_SUCCESS', // проверка успеха оплаты
}

type ActionBooleanPayload = {
  type: ActionType.LOADING;
  payload: boolean;
}

type ActionStringPayload = {
  type: ActionType.CHECK_PAY_RESULT_SUCCESS;
  payload: string;
}

type ActionPayPayload = {
  type: ActionType.PAY_FORM_INIT | ActionType.SEND_PAY_DATA;
  payload: Pay;
}

export type Action =
  ActionBooleanPayload |
  ActionStringPayload |
  ActionPayPayload

export interface IPayStateContext {
  state: ReducerState<Reducer<State, Action>>;
  dispatch: Dispatch<Action> | undefined;
}

export type Pay = {
  OutSum: string;
  MerchantLogin?: string;
  InvId?: string;
  Receipt?: string;
  Description?: string;
  SignatureValue?: string;
  IsTest?: string;
  ShpPayId?: string;
  ShpToken?: string;
}
