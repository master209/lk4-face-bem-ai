import { Reducer, useReducer } from 'react';
import { State, Action, tariffReducer, initState } from '.';

export const useAsReducer = () => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(tariffReducer, initState);
  return {state, dispatch};
};
