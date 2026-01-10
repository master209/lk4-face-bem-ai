import { Reducer, ReducerState, Dispatch } from 'react';

export type State = {
  loading: boolean;
  serverError?: string;
  tariffs?: Tariff[];
  myTariff?: Tariff[];
  selectedTariff?: string; // тариф, выбранный при первичном подключении или при смене тарифа
  internetPassword?: string; // пароль доступа к усл Интернет при запросе его смены
  toastText?: string;
}

// Все возможные варианты действий со стейтом
export enum ActionType {
  LOADING = 'LOADING',
  MY_TARIFF = 'My_TARIFF',
  LOAD_TARIFFS = 'LOAD_TARIFFS',
  SELECT_TARIFF = 'SELECT_TARIFF',
  CHANGE_INTERNET_PASSWORD = 'CHANGE_INTERNET_PASSWORD',
}

type ActionBooleanPayload = {
  type: ActionType.LOADING;
  payload: boolean;
}

type ActionStringPayload = {
  type: ActionType.CHANGE_INTERNET_PASSWORD;
  payload: {
    internetPassword: string;
  };
}

type ActionTariffsPayload = {
  type: ActionType.LOAD_TARIFFS | ActionType.MY_TARIFF;
  payload: Tariffs;
}

type ActionSelectTariffPayload = {
  type: ActionType.SELECT_TARIFF;
  payload: {
    selectedTariff: string;
    toastText: string;
  };
}

export type Action =
  ActionBooleanPayload |
  ActionStringPayload |
  ActionTariffsPayload |
  ActionSelectTariffPayload

export interface ITariffStateContext {
  state: ReducerState<Reducer<State, Action>>;
  dispatch: Dispatch<Action> | undefined;
}

type TariffItem = {
  lab: string;
  val: string;
}

export type Tariff = {
  id: TariffItem;
  name: TariffItem;
  cost: TariffItem;
  rate: TariffItem;
  status: TariffItem;
  startDate: TariffItem;
  startDateOrig: TariffItem; // дата в формате 2024-08-30 для конвертации ее через Date() (чтобы не парсить строку с датой формата - 30-08-2024)
  endDate: TariffItem;
  username: TariffItem;
  password: TariffItem;
  showAccessParams?: boolean;
}

export type Tariffs = Tariff[] | undefined;
