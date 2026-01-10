import { createContext } from 'react';
import { IPayStateContext, Action, ActionType, State } from '.';

const initState: State = {
  loading: false,
  amountMin: '0',
  amountMax: '10000',
  pay: {
    OutSum: ''
  },
};

export const PayStateContext = createContext<IPayStateContext>({
  state: initState,
  dispatch: undefined
});

function payReducer(state: State, action: Action) {
  const {type, payload} = action;

  switch (type) {
    case ActionType.LOADING: {
      return { ...state, loading:true};
    }

    case ActionType.PAY_FORM_INIT: {
      return {...state, ...payload, loading:false};
    }

    case ActionType.SEND_PAY_DATA: {
      return {...state, pay: payload, loading:false};
    }

    case ActionType.CHECK_PAY_RESULT_SUCCESS: {
      return {...state, paySuccess: payload, loading:false};
    }

    default:
      return state;
  }
}

export { payReducer, initState };
