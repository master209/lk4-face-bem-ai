import { createContext } from 'react';
import { ITariffStateContext, Action, ActionType, State} from '.';

const initState: State = {
  loading: false,
  tariffs: undefined,
  myTariff: undefined,
};

export const TariffStateContext = createContext<ITariffStateContext>({
  state: initState,
  dispatch: undefined
});

function tariffReducer(state: State, action: Action) {
  const {type, payload} = action;

  switch (type) {
    case ActionType.LOADING: {
      return { ...state, loading:true };
    }

    case ActionType.MY_TARIFF: {
      return {...state, myTariff: payload, loading:false };
    }

    case ActionType.LOAD_TARIFFS: {
      return {...state, tariffs: payload, loading:false };
    }

    case ActionType.SELECT_TARIFF: {
      return {...state, ...payload, loading:false };
    }

    case ActionType.CHANGE_INTERNET_PASSWORD: {
      return {...state, ...payload, loading:false };
    }

    default:
      return state;
  }
}

export { tariffReducer, initState };
