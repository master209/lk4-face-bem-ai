import { Dispatch } from 'react';
import { Action, ActionType } from '.';
import { RequestProps } from '../../types/common';

export const dispatchLoading = (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.LOADING,
    payload: true
  });
};

export const dispatchPayFormInit = (dispatch: Dispatch<Action>, {api, req}: RequestProps) => {
  dispatchLoading(dispatch);

  api.post(req)
    .then((res) => res.data)
    .then((data) => dispatch({
      type: ActionType.PAY_FORM_INIT,
      payload: data
    }))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('!dispatchPayFormInit - server sent ERROR: ', error);
    });
};

export const dispatchHandlePay = (dispatch: Dispatch<Action>, {api, req, payload}: RequestProps) => {
  dispatchLoading(dispatch);

  api.post(req, payload)
    .then((res) => res.data)
    .then((data) => dispatch({
      type: ActionType.SEND_PAY_DATA,
      payload: data
    }))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('!dispatchSelectTariff - server sent ERROR: ', error);
    });
};

export const dispatchCheckPaySuccess = (dispatch: Dispatch<Action>, {api, req, payload}: RequestProps) => {
  dispatchLoading(dispatch);

  api.post(req, payload)
    .then((res) => res.data)
    .then((data) => dispatch({
      type: ActionType.CHECK_PAY_RESULT_SUCCESS,
      payload: data
    }))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('!dispatchSelectTariff - server sent ERROR: ', error);
    });
};

