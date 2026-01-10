import { Reducer, useReducer } from 'react';
import { State, Action, payReducer, initState } from '.';

export const useAsReducer = () => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(payReducer, initState);
  return {state, dispatch};
};
