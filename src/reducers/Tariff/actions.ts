import { Dispatch } from 'react';
import { Action, ActionType, Tariffs } from '.';
import { RequestProps } from '../../types/common';

export const dispatchLoading = (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.LOADING,
    payload: true
  });
};

export const dispatchLoadTariffs = (dispatch: Dispatch<Action>, {api, req}: RequestProps) => {
  dispatchLoading(dispatch);

  api.get(req)
    .then((res) => res.data as Tariffs)
    .then((data) => dispatch({
      type: ActionType.LOAD_TARIFFS,
      payload: data
    }))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('!dispatchLoadTariffs - server sent ERROR: ', error);
    });
};

export const dispatchMyTariff = (dispatch: Dispatch<Action>, {api, req}: RequestProps) => {
  dispatchLoading(dispatch);

  api.get(req)
    .then((res) => res.data as Tariffs)
    .then((data) => dispatch({
      type: ActionType.MY_TARIFF,
      payload: data
    }))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('!dispatchMyTariff - server sent ERROR: ', error);
    });
};

export const dispatchSelectTariff = (dispatch: Dispatch<Action>, {api, req, payload}: RequestProps) => {
  dispatchLoading(dispatch);

  api.post(req, payload)
    .then((res) => res.data)
    .then((data) => dispatch({
      type: ActionType.SELECT_TARIFF,
      payload: data
    }))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('!dispatchSelectTariff - server sent ERROR: ', error);
    });
};

export const dispatchChangeInternetPassword = (dispatch: Dispatch<Action>, {api, req, payload}: RequestProps) => {
  dispatchLoading(dispatch);

  api.post(req, payload)
    .then((res) => res.data)
    .then((data) => dispatch({
      type: ActionType.CHANGE_INTERNET_PASSWORD,
      payload: data
    }))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('!dispatchChangeInternetPassword - server sent ERROR: ', error);
    });
};

